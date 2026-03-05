import "./login.css";

const LoginPage = () => {
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

        <div className="formBox"></div>
      </div>
    </div>
  );
};

export default LoginPage;
