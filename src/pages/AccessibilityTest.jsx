import React from "react";
import BackButton from "../components/BackButton";

function AccessibilityTest() {
  return (
    <div style={{ padding: "24px" }}>
      <BackButton />
      <h1>Accessibility Test Page</h1>
      <p>
        This page intentionally includes accessibility issues so your low-code app
        can detect them.
      </p>

      {/* Skipped heading levels on purpose */}
      <h4>Section With Heading Order Issue</h4>

      {/* Empty alt text for meaningful image */}
      <img
        src="https://picsum.photos/640/200"
        alt=""
        style={{ width: "100%", maxWidth: "640px", marginBottom: "20px" }}
      />

      {/* Low contrast text */}
      <p style={{ color: "#b3b3b3", backgroundColor: "#c0c0c0", padding: "8px" }}>
        This paragraph has poor color contrast.
      </p>

      {/* Form controls without associated labels */}
      <div style={{ marginTop: "20px", display: "grid", gap: "10px", maxWidth: "420px" }}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <select defaultValue="">
          <option value="" disabled>
            Choose category
          </option>
          <option value="a">Category A</option>
          <option value="b">Category B</option>
        </select>
      </div>

      {/* Duplicate IDs on purpose */}
      <div style={{ marginTop: "20px" }}>
        <input id="duplicate-id" type="checkbox" />
        <label htmlFor="duplicate-id">First checkbox</label>
        <br />
        <input id="duplicate-id" type="checkbox" />
        <label htmlFor="duplicate-id">Second checkbox</label>
      </div>

      {/* Clickable non-semantic element (not keyboard accessible) */}
      <div
        onClick={() => window.alert("Clicked non-semantic element")}
        style={{
          marginTop: "24px",
          display: "inline-block",
          padding: "10px 14px",
          border: "1px solid #222",
          cursor: "pointer",
        }}
      >
        Clickable div
      </div>

      {/* Generic link text */}
      <p style={{ marginTop: "24px" }}>
        <a href="https://example.com">Click here</a>
      </p>

      {/* Positive tabindex and empty button text */}
      <div style={{ marginTop: "20px" }}>
        <button tabIndex="5">Focusable Out Of Order</button>
        <button aria-label=""></button>
      </div>

      {/* Auto-playing media without captions */}
      <div style={{ marginTop: "24px" }}>
        <video width="320" height="180" autoPlay muted loop>
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Table without proper header associations */}
      <div style={{ marginTop: "30px" }}>
        <h3>Data Table Issues</h3>
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <tr>
            <td>Name</td>
            <td>Role</td>
            <td>Status</td>
          </tr>
          <tr>
            <td>Alex</td>
            <td>Admin</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Jamie</td>
            <td>Editor</td>
            <td>Pending</td>
          </tr>
        </table>
      </div>

      {/* ARIA misuse and contradictory semantics */}
      <div style={{ marginTop: "30px" }}>
        <h3>ARIA Misuse</h3>
        <button role="heading" aria-level="2">Button pretending to be heading</button>
        <p role="button">Paragraph pretending to be a button</p>
      </div>

      {/* Focusable element hidden from accessibility tree */}
      <div style={{ marginTop: "30px" }}>
        <h3>Focusable But Hidden To Screen Readers</h3>
        <button aria-hidden="true">Focusable hidden button</button>
      </div>

      {/* Dialog semantics broken: no label/description and always visible */}
      <div style={{ marginTop: "30px" }}>
        <h3>Dialog Issues</h3>
        <div role="dialog" style={{ border: "1px solid #999", padding: "12px", maxWidth: "420px" }}>
          <h4>Dialog title not associated</h4>
          <p>Dialog has no aria-labelledby or aria-describedby.</p>
          <button>Close</button>
        </div>
      </div>

      {/* Opening new tab without warning text */}
      <div style={{ marginTop: "30px" }}>
        <h3>Link Behavior Issues</h3>
        <a href="https://developer.mozilla.org">Read docs</a>
      </div>

      {/* Tiny target and tiny text for readability/touch issues */}
      <div style={{ marginTop: "30px" }}>
        <h3>Touch Target and Readability Issues</h3>
        <button style={{ width: "16px", height: "16px", padding: 0 }}>i</button>
        <p style={{ fontSize: "10px", maxWidth: "280px" }}>
          This text is intentionally very small to cause readability issues.
        </p>
      </div>

      {/* Missing group semantics for related controls */}
      <div style={{ marginTop: "30px" }}>
        <h3>Grouped Controls Without Fieldset</h3>
        <p>Choose your plan:</p>
        <input type="radio" name="plan" id="plan-basic" />
        <label htmlFor="plan-basic">Basic</label>
        <br />
        <input type="radio" name="plan" id="plan-pro" />
        <label htmlFor="plan-pro">Pro</label>
      </div>

      {/* Auto-updating region without announcement semantics */}
      <div style={{ marginTop: "30px" }}>
        <h3>Live Content Without ARIA Live</h3>
        <p>
          Time now (updates each render-like interaction): {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Image map area links with vague alt text */}
      <div style={{ marginTop: "30px" }}>
        <h3>Image Link Issues</h3>
        <a href="https://example.com/a">
          <img src="https://picsum.photos/120/80" alt="thing" />
        </a>
        <a href="https://example.com/b" style={{ marginLeft: "10px" }}>
          <img src="https://picsum.photos/121/80" alt="thing" />
        </a>
      </div>

      {/* Visual-only required indicator with no programmatic requirement */}
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <h3>Form Validation Issues</h3>
        <label>
          Phone Number <span style={{ color: "red" }}>*</span>
        </label>
        <input type="text" placeholder="123-456-7890" />
        <p style={{ color: "#777" }}>Fields with * are required.</p>
      </div>
    </div>
  );
}

export default AccessibilityTest;
