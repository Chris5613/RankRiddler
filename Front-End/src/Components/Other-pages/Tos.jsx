import React from 'react';
import { NavLink } from 'react-router-dom';

const Tos = () => {
  return (
    <div className="tos">
      <h2>User Accounts and Registration</h2>
      <p>
        To use some parts of the service, you may be required to register for an
        account.
        <br /> You agree to provide accurate and complete information when
        registering for an account.
      </p>

      <h2>User Content and Conduct</h2>
      <p>
        You are solely responsible for any content you post or upload on the
        service. <br /> You agree not to use the service to post or upload any
        content that is defamatory, <br /> offensive, or illegal.
      </p>

      <h2>Intellectual Property Rights</h2>
      <p>
        All content and materials available on the service, including but not
        limited to trademarks, <br />
        logos, and service marks,are the property of our company or our
        licensors.
      </p>

      <h2>Confidentiality and Privacy</h2>
      <p>
        We take your privacy seriously. Please refer to our{' '}
        <NavLink style={{ color: 'white' }} to="/privacy">
          Privacy Policy
        </NavLink>{' '}
        for more information.
      </p>

      <h2>Termination and Suspension of Account</h2>
      <p>
        We reserve the right to terminate or suspend your account at any time
        for any reason without notice.
      </p>

      <h2>Changes to the Terms of Service</h2>
      <p>
        We may update these terms and conditions from time to time without
        notice. <br /> Your continued use of the service constitutes your
        acceptance of the updated terms and conditions.
      </p>
    </div>
  );
};

export default Tos;
