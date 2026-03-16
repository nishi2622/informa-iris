import { useEffect, useState } from "react";
import "./login.css";
// import { Snackbar, CircularProgress } from "@mui/material";

const LoginPage = (props) => {
  const { setLoggedin, setUserName } = props;
  const [showToast, setToastData] = useState({
    show: false,
    message: "",
  });

  const resetToast = () => {
    setTimeout(() => {
      setToastData({
        show: false,
        message: null,
      });
    }, 2000);
  };
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
    const handleIrisEvent = (event) => {
      if (event.detail.type === "login") {
        const { success, ...logindata } = event.detail.payload;
        console.log("success--", event.detail, success, logindata);
        if (success) {
          setToastData({
            show: true,
            message: logindata.data?.message || "User logged in Successfully",
          });
          resetToast();
          console.log("Detected login response", logindata);
          setLoggedin(true);
          setUserName(logindata.data?.user || "");
        } else {
          setToastData({
            show: true,
            message: logindata.error?.message,
          });
          resetToast();
        }
      } else if (event.detail.type === "signup") {
        const { success, ...signupdata } = event.detail.payload;
        console.log("success--", event.detail, success, signupdata);
        if (success) {
          setToastData({
            show: true,
            message: signupdata.data?.message || "User signed in Successfully",
          });
          resetToast();
          console.log("Detected signin response", signupdata);
        } else {
          setToastData({
            show: true,
            message: signupdata.error?.message,
          });
          resetToast();
        }
      }
    };
    window.addEventListener("irisAuthEvent", handleIrisEvent);
    return () => window.removeEventListener("irisAuthEvent", handleIrisEvent);
  }, []);

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
          {/* {loading == true && (
            <div className="rightLoader">
              <CircularProgress />
            </div>
          )} */}
          <div id="auth-container"></div>
        </div>
      </div>

      {/* {showToast.show ? (
        <Snackbar
          open={showToast.show}
          autoHideDuration={2000}
          message={showToast.message}
        />
      ) : null} */}
    </div>
  );
};

export default LoginPage;
