import { useEffect, useState } from "react";
import "./login.css";

const LoginPage = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const [toastData, setToastData] = useState({});

  const waitForSDKAndRenderForm = () => {
    const maxWaitTime = 10000; // 10 seconds
    const pollInterval = 100; // Check every 100ms
    let elapsedTime = 0;
    const authContainer = document.getElementById("auth-container");
    if (!authContainer) {
      console.warn("auth-container element not found");
      return;
    }

    const pollTimer = setInterval(async () => {
      elapsedTime += pollInterval;

      console.log(window.IIRISPassport);
      // console.log(React.version);
      if (
        window.IIRISPassport &&
        typeof window.IIRISPassport.getRegistrationForm === "function"
      ) {
        clearInterval(pollTimer);
        console.log("SDK Ready! Rendering AuthForm...");

        try {
          const formHtml = await window.IIRISPassport.getRegistrationForm({
            containerId: "auth-container",
            responseType: "code",
          });
          console.log(formHtml);
          // container.innerHTML = formHtml;
          console.log("✅ Unified Auth form rendered successfully.");
          // setloading(false);
        } catch (error) {
          console.error("❌ Error rendering unified auth form:", error);
          authContainer.innerHTML =
            '<div style="color: red; padding: 20px;">Error loading authentication form. Please refresh.</div>';
          // setloading(false);
        }
        return;
      }

      // Timeout protection
      if (elapsedTime >= maxWaitTime) {
        clearInterval(pollTimer);
        console.error(
          "❌ SDK initialization timeout (10 seconds). SDK not available.",
        );
        console.log("window.IIRISPassport:", window.IIRISPassport);
        authContainer.innerHTML =
          '<div style="color: red; padding: 20px;">Authentication form failed to load. Please refresh the page.</div>';
        // setloading(false);
      }
    }, pollInterval);
  };

  useEffect(() => {
    console.log("window---", window);
    // loadAuth(window);
    waitForSDKAndRenderForm();
  }, []);

  useEffect(() => {
    if (
      window.IIRISPassport &&
      window.IIRISPassport.irisLoginCallback === "function" &&
      window.IIRISPassport.irisLoginCallback.success
    ) {
      console.log(window.IIRISPassport.irisLoginCallback);
      setToastData({
        show: true,
        message:
          window.IIRISPassport.irisLoginCallback?.data?.message ||
          window.IIRISPassport.irisLoginCallback?.error?.message,
      });
      if (window.IIRISPassport.irisLoginCallback.success == true) {
        setLoggedin(true);
      }
    }
  }, [window.IIRISPassport.irisLoginCallback]);

  useEffect(() => {
    if (
      window.IIRISPassport &&
      window.IIRISPassport.irisRegisterCallback === "function" &&
      window.IIRISPassport.irisRegisterCallback.success
    ) {
      console.log(window.IIRISPassport.irisRegisterCallback);
      setToastData({
        show: true,
        message:
          window.IIRISPassport.irisRegisterCallback?.data?.message ||
          window.IIRISPassport.irisRegisterCallback?.error?.message,
      });
    }
  }, [window.IIRISPassport.irisRegisterCallback]);

  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <div className="logo">NRN</div>
      </header>

      {/* BANNER */}
      <div className="banner">
        <img
          src="https://dummyimage.com/1200x250/000/fff&text=Nation's+Restaurant+News+Webinar"
          alt="webinar"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        {/* LEFT SECTION */}
        <div className="left">
          <h1 className="title">
            Seasonal Success with Jamie Starner: Hiring Summer Staff While
            Staying Compliant
          </h1>

          <div className="meta">
            <span>📅 Oct 28, 2025</span>
            <span>⏰ 3:00 pm EDT</span>
            <span>⏱ Duration: 2 Hr</span>
          </div>

          <p>
            Hiring for the summer rush? Whether you're bringing on your first
            batch of hourly workers or scaling up for your busiest season, it's
            critical to stay compliant from day one.
          </p>

          <p>
            Join Workstream and Talent Acquisition Leader Jamie Starner as they
            walk you through the essential compliance steps every operator needs
            to remember when onboarding new employees.
          </p>

          <h3>Learning Objectives</h3>

          <ul>
            <li>Understand key employment forms required for new hires</li>
            <li>Track employee hours and ACA eligibility</li>
            <li>Build a compliance-friendly onboarding process</li>
          </ul>

          {/* SPONSORS */}
          <div className="sponsors">
            <h3>Sponsored by</h3>

            <div className="sponsorLogos">
              <img src="https://dummyimage.com/120x40/ccc/000&text=Palona" />
              <img src="https://dummyimage.com/120x40/ccc/000&text=PAR" />
              <img src="https://dummyimage.com/120x40/ccc/000&text=ClearCogs" />
              <img src="https://dummyimage.com/120x40/ccc/000&text=Leasecake" />
              <img src="https://dummyimage.com/120x40/ccc/000&text=Revmo" />
            </div>
          </div>

          {/* SPEAKERS */}

          <div className="speakers">
            <h3>Speakers</h3>

            <div className="speakerList">
              <div className="speaker">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" />
                <h4>Jamie Starner</h4>
                <p>Talent Acquisition Leader</p>
              </div>

              <div className="speaker">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" />
                <h4>Emily Hancock</h4>
                <p>Marketing - Workstream</p>
              </div>

              <div className="speaker">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" />
                <h4>Leigh Anne</h4>
                <p>Managing Editor</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="right" style={{ textAlign: "start" }}>
          <div id="auth-container"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
