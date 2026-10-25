import { useEffect, useRef, useState } from "react";
import Icon from "./Icons.jsx";
import { createLead, getLeadPage } from "./leadCreation.js";

// Phone validation is client-side format validation, not number ownership verification.
// The POST keeps an E.164-style phone string (no spaces), e.g. "+919876543210".
const COUNTRIES = [
  { iso: "IN", name: "India", dial: "+91", emoji: "🇮🇳", min: 10, max: 10, placeholder: "98765 43210" },
  { iso: "US", name: "United States", dial: "+1", emoji: "🇺🇸", min: 10, max: 10, placeholder: "202 555 0123" },
  { iso: "CA", name: "Canada", dial: "+1", emoji: "🇨🇦", min: 10, max: 10, placeholder: "416 555 0123" },
  { iso: "GB", name: "United Kingdom", dial: "+44", emoji: "🇬🇧", min: 10, max: 10, placeholder: "7123 456789", dropZero: true },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", emoji: "🇦🇪", min: 9, max: 9, placeholder: "50 123 4567", dropZero: true },
  { iso: "SG", name: "Singapore", dial: "+65", emoji: "🇸🇬", min: 8, max: 8, placeholder: "8123 4567" },
  { iso: "AU", name: "Australia", dial: "+61", emoji: "🇦🇺", min: 9, max: 9, placeholder: "412 345 678", dropZero: true },
  { iso: "DE", name: "Germany", dial: "+49", emoji: "🇩🇪", min: 10, max: 11, placeholder: "1512 3456789", dropZero: true },
];

const SERVICES = [
  { value: "end_to_end_revenue_automation", label: "End-to-end lead-to-customer automation" },
  { value: "ai_follow_up", label: "AI-powered lead follow-ups" },
  { value: "lead_qualification", label: "Lead qualification & routing" },
  { value: "crm_integration", label: "CRM & pipeline automation" },
  { value: "discovery", label: "I'm not sure yet — help me decide" },
];
const REGIONAL_BUDGETS = {
  IN: { code: "INR", locale: "en-IN", bands: [25000, 50000, 100000, 250000] },
  US: { code: "USD", locale: "en-US", bands: [300, 600, 1200, 3000] },
  CA: { code: "CAD", locale: "en-CA", bands: [400, 800, 1600, 4000] },
  GB: { code: "GBP", locale: "en-GB", bands: [225, 450, 900, 2250] },
  AE: { code: "AED", locale: "en-AE", bands: [1100, 2200, 4400, 11000] },
  SG: { code: "SGD", locale: "en-SG", bands: [400, 800, 1600, 4000] },
  AU: { code: "AUD", locale: "en-AU", bands: [450, 900, 1800, 4500] },
  DE: { code: "EUR", locale: "de-DE", bands: [250, 500, 1000, 2500] },
};

function getBudgetOptions(countryIso) {
  const { code, locale, bands } = REGIONAL_BUDGETS[countryIso] ?? REGIONAL_BUDGETS.IN;
  const format = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  });
  const [a, b, c, d] = bands.map((amount) => format.format(amount));

  return [
    { value: "under_25000", label: `Under ${a}` },
    { value: "25000_50000", label: `${a} – ${b}` },
    { value: "50000_100000", label: `${b} – ${c}` },
    { value: "100000_250000", label: `${c} – ${d}` },
    { value: "over_250000", label: `${d}+` },
    { value: "undecided", label: "Still exploring options" },
  ];
}
const URGENCY = [
  { value: "asap", label: "ASAP — let's get moving" },
  { value: "this_month", label: "Within this month" },
  { value: "one_to_three_months", label: "Next 1–3 months" },
  { value: "exploring", label: "Just researching for now" },
];

const EMPTY = {
  name: "",
  email: "",
  phoneNumber: "",
  company: "",
  city: "",
  service: "",
  budget: "",
  urgency: "",
};

const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i;

function getCountry(iso) {
  return COUNTRIES.find((item) => item.iso === iso) ?? COUNTRIES[0];
}

function localDigits(number, country) {
  let digits = String(number).replace(/\D/g, "");
  // In many countries the optional leading 0 is a national trunk prefix,
  // which must be omitted in international format.
  if (country.dropZero && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function validate(values, country) {
  const errors = {};
  for (const [key, value] of Object.entries(values)) {
    if (!value.trim()) errors[key] = "This field is required.";
  }

  if (values.name.trim() && values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  const email = values.email.trim();
  if (email && (email.length > 254 || !EMAIL_PATTERN.test(email) || email.split("@")[0].includes(".."))) {
    errors.email = "Enter a valid email, such as name@company.com.";
  }

  if (values.phoneNumber.trim()) {
    const digits = localDigits(values.phoneNumber, country);
    if (digits.length < country.min || digits.length > country.max || !/^[1-9]\d+$/.test(digits)) {
      errors.phoneNumber = `Enter a valid ${country.name} number (${country.min}${country.min !== country.max ? `–${country.max}` : ""} digits, without the country code).`;
    } else if (country.iso === "IN" && !/^[6-9]\d{9}$/.test(digits)) {
      errors.phoneNumber = "Indian mobile numbers must have 10 digits and start with 6–9.";
    }
  }

  return errors;
}

function Input({ name, label, value, onChange, onBlur, error, type = "text", placeholder, autoComplete, maxLength = 120, valid = false }) {
  return (
    <div className={`am-field ${error ? "am-field--error" : ""} ${valid ? "am-field--valid" : ""}`}>
      <label htmlFor={name}>{label} <span aria-hidden="true">*</span></label>
      <div className="am-input-shell">
        <input
          id={name} name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)} placeholder={placeholder} autoComplete={autoComplete}
          maxLength={maxLength} required aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {valid && <Icon name="check-circle" size={18} className="am-input-check" />}
      </div>
      {error && <span id={`${name}-error`} className="am-field-message" role="alert">{error}</span>}
    </div>
  );
}

function Dropdown({ name, label, value, placeholder, options, onChange, onBlur, error }) {
  return (
    <div className={`am-field ${error ? "am-field--error" : ""}`}>
      <label htmlFor={name}>{label} <span aria-hidden="true">*</span></label>
      <div className="am-select-wrap">
        <select id={name} name={name} value={value} onChange={(event) => onChange(name, event.target.value)}
          onBlur={() => onBlur(name)} required aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}>
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <Icon name="chevron" size={18} />
      </div>
      {error && <span id={`${name}-error`} className="am-field-message" role="alert">{error}</span>}
    </div>
  );
}

function PhoneField({ value, countryIso, onChange, onCountryChange, onBlur, error, valid }) {
  const country = getCountry(countryIso);
  return (
    <div className={`am-field am-phone-field ${error ? "am-field--error" : ""} ${valid ? "am-field--valid" : ""}`}>
      <label htmlFor="phoneNumber">Phone number <span aria-hidden="true">*</span></label>
      <div className="am-phone-composite">
        <div className="am-country-select">
          <select id="phoneCountry" value={countryIso} onChange={(e) => onCountryChange(e.target.value)}
            aria-label="Phone country code" title="Select phone country code">
            {COUNTRIES.map((item) => (
              <option key={item.iso} value={item.iso}>{item.emoji} {item.dial} ({item.iso})</option>
            ))}
          </select>
          <Icon name="chevron" size={15} />
        </div>
        <input
          id="phoneNumber" name="phoneNumber" type="tel" inputMode="numeric" autoComplete="tel-national"
          placeholder={country.placeholder} value={value} required maxLength={18}
          onChange={(event) => onChange("phoneNumber", event.target.value.replace(/\D/g, "").slice(0, 15))}
          onBlur={() => onBlur("phoneNumber")}
          aria-invalid={Boolean(error)} aria-describedby={error ? "phoneNumber-error" : "phoneNumber-hint"}
        />
        {valid && <Icon name="check-circle" size={18} className="am-phone-valid" />}
      </div>
      {error ? <span id="phoneNumber-error" className="am-field-message" role="alert">{error}</span> :
        <small className="am-field-hint" id="phoneNumber-hint">
          {localDigits(value, country)
            ? <>Full number: <strong className="am-phone-preview">{country.dial} {localDigits(value, country)}</strong></>
            : <>Country code is added automatically. No need to type {country.dial}.</>}
        </small>}
    </div>
  );
}

function SuccessScreen({ onReset }) {
  return (
    <div className="am-success" role="status">
      <div className="am-success-glow" aria-hidden="true" />
      <div className="am-success-icon"><Icon name="check" size={36} strokeWidth={2} /></div>
      <div className="am-kicker"><span className="am-kicker-dot" /> RECEIVED LOUD AND CLEAR</div>
      <h1>Good things<br /><em>start here.</em></h1>
      <p>Your inquiry is in. We have the details we need to start a real conversation about growing your revenue.</p>
      <div className="am-success-actions">
        <a href="/" className="am-action-primary">Back to home <Icon name="arrow-up-right" size={19} /></a>
        <button className="am-action-secondary" type="button" onClick={onReset}>Submit another inquiry</button>
      </div>
      <div className="am-success-foot"><Icon name="shield" size={17} /> Your information stays part of your inquiry.</div>
    </div>
  );
}

export default function CreateLead() {
  const [values, setValues] = useState(EMPTY);
  const [countryIso, setCountryIso] = useState("IN");
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState("idle");
  const [requestError, setRequestError] = useState("");
  const controller = useRef(null);

  useEffect(() => {
    const pending = new AbortController();
    getLeadPage({ signal: pending.signal }).catch((error) => {
      if (error?.name !== "AbortError") console.warn("Create client page GET failed:", error);
    });
    return () => pending.abort();
  }, []);

  useEffect(() => () => controller.current?.abort(), []);

  const country = getCountry(countryIso);
  const errors = validate(values, country);
  const fieldError = (name) => (submitted || touched[name] ? errors[name] : undefined);
  const isValid = (name) => Boolean(touched[name] && values[name].trim() && !errors[name]);
  const completed = Object.values(values).filter((value) => String(value).trim()).length;
  const completion = Math.round((completed / Object.keys(EMPTY).length) * 100);

  function update(name, value) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setRequestError("");
  }

  function blur(name) {
    setTouched((previous) => ({ ...previous, [name]: true }));
  }

  function changeCountry(iso) {
    setCountryIso(iso);
    setRequestError("");
    // A changed country may change the currency shown. Ask users to pick
    // their budget again rather than silently changing its meaning.
    setValues((previous) => ({ ...previous, budget: "" }));
    setTouched((previous) => ({ ...previous, phoneNumber: false, budget: false }));
  }

  function reset() {
    controller.current?.abort();
    setValues(EMPTY);
    setCountryIso("IN");
    setTouched({});
    setSubmitted(false);
    setState("idle");
    setRequestError("");
  }

  async function submit(event) {
    event.preventDefault();
    if (state === "submitting") return;
    setSubmitted(true);
    const nextErrors = validate(values, country);
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    const phone = country.dial + localDigits(values.phoneNumber, country);
    const payload = {
      name: values.name.trim(),
      city: values.city.trim(),
      email: values.email.trim().toLowerCase(),
      service: values.service,
      budget: values.budget,
      company: values.company.trim(),
      urgency: values.urgency,
      phone,
    };

    setRequestError("");
    setState("submitting");
    const pending = new AbortController();
    controller.current = pending;
    try {
      await createLead(payload, { signal: pending.signal });
      if (!pending.signal.aborted) setState("success");
    } catch (error) {
      if (error?.name === "AbortError") return;
      setRequestError(error instanceof TypeError
        ? "Unable to reach Automex. Please check your connection and try again."
        : (error?.message || "Something went wrong. Please try again."));
      setState("idle");
    } finally {
      if (controller.current === pending) controller.current = null;
    }
  }

  return (
    <div className="lead-page am-lead-page">
      <aside className="am-left-panel">
        <div className="am-left-inner">
          <div className="am-left-top">
            <a className="am-brand" href="/" aria-label="Automex homepage">
              <span className="am-brand-mark"><span /></span>automex<span className="am-brand-period">.</span>
            </a>
            <span className="am-identity">THE REVENUE STUDIO / 01</span>
          </div>

          <div className="am-aside-intro">
            <div className="am-kicker"><span className="am-kicker-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
            <h2>More than<br />leads. <em>Real<br />customers.</em></h2>
            <p>One conversation can change your pipeline. Tell us what you're building. We'll help you connect the dots.</p>
          </div>

          <div className="am-aside-showcase" aria-hidden="true">
            <div className="am-aside-ambient" />
            <div className="am-mini-top"><span><i /> YOUR REVENUE LOOP</span><span>01 — 03</span></div>
            <div className="am-mini-step"><span className="am-mini-icon"><Icon name="message" size={17} /></span><div><strong>A new lead comes in</strong><small>Interest captured</small></div><span className="am-mini-tick"><Icon name="check" size={14}/></span></div>
            <div className="am-mini-connector" />
            <div className="am-mini-step"><span className="am-mini-icon"><Icon name="sparkles" size={17} /></span><div><strong>The right follow-up</strong><small>Relevant. Timely. Personal.</small></div><span className="am-mini-tick"><Icon name="check" size={14}/></span></div>
            <div className="am-mini-connector" />
            <div className="am-mini-step am-mini-step--last"><span className="am-mini-icon am-mini-icon--lime"><Icon name="calendar" size={18} /></span><div><strong>A real conversation</strong><small>Ready to move forward</small></div><span className="am-mini-arrow">↗</span></div>
            <div className="am-mini-outcome"><span className="am-outcome-dot" /><span>LESS CHASING. MORE CLOSING.</span><Icon name="arrow-up-right" size={16}/></div>
          </div>

          <div className="am-aside-bottom"><span>THE FUTURE OF FOLLOW-THROUGH.</span><span>EST. IN INTENT. BUILT FOR ACTION. ↗</span></div>
        </div>
      </aside>

      <main className="am-right-panel" aria-label="Create a client inquiry">
        <div className="am-form-shell">
          <div className="am-back-row">
            <a className="am-back" href="/"><span className="am-back-circle"><Icon name="arrow" size={17} /></span> BACK TO HOME</a>
            <div className="am-page-tag">AUTOMEX / GET STARTED <span>↗</span></div>
          </div>

          {state === "success" ? <SuccessScreen onReset={reset} /> : (
            <>
              <header className="am-page-heading">
                <div className="am-heading-eyebrow"><span className="am-small-square" /> LET'S BUILD SOMETHING THAT CONVERTS</div>
                <h1>Let's get your<br /><em>revenue moving.</em></h1>
                <p>A few details about you and your business. We'll take it from there.</p>
              </header>

              <div className="am-progress-card" aria-label={`${completion}% of the form completed`}>
                <div className="am-progress-head"><div><span className="am-progress-mini">YOUR INQUIRY</span><strong>Let's get acquainted</strong></div><span className="am-progress-number">{completed}<span> / 08</span></span></div>
                <div className="am-progress-track"><div style={{ width: `${completion}%` }} /></div>
              </div>

              <form className="am-form" noValidate onSubmit={submit}>
                <div className="am-form-group-head"><span className="am-group-num">01</span><div><h3>First, the essentials.</h3><p>Who should we connect with?</p></div><Icon name="user" size={20} /></div>
                <div className="am-form-grid">
                  <Input name="name" label="Your full name" value={values.name} onChange={update} onBlur={blur} error={fieldError("name")} valid={isValid("name")} placeholder="e.g. Aanya Sharma" autoComplete="name" />
                  <Input name="email" label="Work email address" type="email" value={values.email} onChange={update} onBlur={blur} error={fieldError("email")} valid={isValid("email")} placeholder="you@yourcompany.com" autoComplete="email" maxLength={254} />
                  <PhoneField value={values.phoneNumber} countryIso={countryIso} onChange={update} onCountryChange={changeCountry} onBlur={blur} error={fieldError("phoneNumber")} valid={isValid("phoneNumber")} />
                  <Input name="company" label="Company / business" value={values.company} onChange={update} onBlur={blur} error={fieldError("company")} valid={isValid("company")} placeholder="Your business name" autoComplete="organization" />
                  <div className="am-grid-full">
                    <Input name="city" label="Where are you based?" value={values.city} onChange={update} onBlur={blur} error={fieldError("city")} valid={isValid("city")} placeholder="e.g. Indore" autoComplete="address-level2" />
                  </div>
                </div>

                <div className="am-form-divider" />
                <div className="am-form-group-head"><span className="am-group-num">02</span><div><h3>Now, the big picture.</h3><p>Tell us what you're looking to unlock.</p></div><Icon name="target" size={20} /></div>
                <div className="am-form-grid">
                  <div className="am-grid-full"><Dropdown name="service" label="What can we help with?" placeholder="Select a service" value={values.service} onChange={update} onBlur={blur} error={fieldError("service")} options={SERVICES} /></div>
                  <Dropdown name="budget" label={`Approximate budget (${REGIONAL_BUDGETS[countryIso].code})`} placeholder="Select your range" value={values.budget} onChange={update} onBlur={blur} error={fieldError("budget")} options={getBudgetOptions(countryIso)} />
                  <Dropdown name="urgency" label="When do you want to start?" placeholder="Select a timeline" value={values.urgency} onChange={update} onBlur={blur} error={fieldError("urgency")} options={URGENCY} />
                </div>

                {requestError && <div className="am-submit-error" role="alert"><span>!</span>{requestError}</div>}
                <div className="am-form-finish">
                  <div className="am-form-secure"><Icon name="shield" size={19} /><span>Your details will only be used to handle your inquiry.</span></div>
                  <button type="submit" className="am-submit" disabled={state === "submitting"}>
                    <span>{state === "submitting" ? "Sending your inquiry…" : "Let's build your revenue loop"}</span>
                    <span className="am-submit-icon">{state === "submitting" ? <span className="am-spinner" /> : <Icon name="arrow-up-right" size={19} />}</span>
                  </button>
                </div>
              </form>
              <div className="am-form-footer"><span>✳</span> HUMAN CONNECTION. INTELLIGENT FOLLOW-THROUGH.</div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
