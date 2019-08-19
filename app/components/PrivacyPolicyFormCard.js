import React, { Component } from 'react';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import GoBackButton from './GoBackButton';
import styles from './PrivacyPolicyFormCard.css';

type Props = {
  onBack: () => void
};

export default class PrivacyPolicyFormCard extends Component<Props, State> {
  render() {
    const { onBack } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Privacy Policy</FormCardHeader>
        <FormCardContent>
          <h4>Clear My Record: Addition to Code for America Privacy Policy</h4>
          <p>
            We automatically collect and store data about your visit to the
            Clear My Record website and application
          </p>
          <ul className={styles.bulletList}>
            <li>Domain from which you access the Internet</li>
            <li>
              Operating system on your computer and information about the
              browser you used when visiting the site
            </li>
            <li>Date and time of your visit</li>
            <li>Pages you visited</li>
            <li>
              Address of the website that connects you to the Site (such as
              google.com or bing.com)
            </li>
          </ul>
          <p>When you register to use our application, we ask you for:</p>
          <ul className={styles.bulletList}>
            <li>Your name</li>
            <li>Your phone number</li>
            <li>Your county</li>
            <li>Your county agency</li>
            <li>Your job title</li>
          </ul>
          <h4>As Required By Law and Similar Disclosures </h4>
          <p>
            We may access, preserve, and disclose your information if we believe
            doing so is required or appropriate to:
            <ul>
              <li>
                (a) comply with law enforcement requests and legal process, such
                as a court order or subpoena;
              </li>
              <li>(b) respond to your requests; or </li>
              <li>
                (c) protect your, our, or others’ rights, property, or safety.
              </li>
            </ul>
            For the avoidance of doubt, the disclosure of your information may
            occur if you post any objectionable content on or through the Site.
          </p>
          <h4>Merger, Sale, or Other Asset Transfers</h4>
          <p>
            We may transfer your information to service providers, advisors,
            potential transactional partners, or other third parties in
            connection with the consideration, negotiation, or completion of a
            corporate transaction in which we are acquired by or merged with
            another company or we sell, liquidate, or transfer all or a portion
            of our assets. The use of your information following any of these
            events will be governed by the provisions of this Privacy Policy in
            effect at the time the applicable information was collected.
          </p>
          <h4>Consent</h4>
          <p>
            We may also disclose information from you or about you or your
            devices with your permission.
          </p>
          <h4>Children&apos;s Privacy</h4>
          <p>
            We do not knowingly collect, maintain, or use personal information
            from children under 13 years of age, and no part of our Site is
            directed to children. If you learn that a child has provided us with
            personal information in violation of this Privacy Policy, then you
            may alert us at info@codeforamerica.org.
          </p>
          <h4>Security</h4>
          <p>
            We make reasonable efforts to protect your information by using
            physical and electronic safeguards designed to improve the security
            of the information we maintain. However, as our Services are hosted
            electronically, we can make no guarantees as to the security or
            privacy of your information.
          </p>
        </FormCardContent>
        <FormCardFooter>
          <div className="text--centered">
            <GoBackButton onGoBack={onBack} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}
