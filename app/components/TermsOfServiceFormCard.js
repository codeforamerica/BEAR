// @flow
import React, { Component } from 'react';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import GoBackButton from './GoBackButton';
import styles from './TermsOfServiceFormCard.css';

type Props = {
  onBack: () => void
};

export default class TermsOfServiceFormCard extends Component<Props> {
  render() {
    const { onBack } = this.props;
    return (
      <FormCard>
        <FormCardHeader>Terms of Service</FormCardHeader>
        <FormCardContent>
          <div className={styles.header}>
            <h4>Software End User License Agreement</h4>
          </div>
          <p>
            This End User License Agreement (this &quot;<b>Agreement</b>&quot;)
            is a binding agreement between Code for America Labs, Inc. (&quot;
            <b>Licensor</b>&quot;) and you and your county (collectively, &quot;
            <b>Licensee</b>&quot;) as the licensee of the software program
            called “Clear My Record” (the &quot;<b>Software</b>&quot;).
          </p>
          <p>
            LICENSOR PROVIDES THE SOFTWARE SOLELY ON THE TERMS AND CONDITIONS
            SET FORTH IN THIS AGREEMENT AND ON THE CONDITION THAT LICENSEE
            ACCEPTS AND COMPLIES WITH THEM. BY CLICKING THE &quot;ACCEPT&quot;
            BUTTON YOU (A) ACCEPT THIS AGREEMENT AND AGREE THAT LICENSEE IS
            LEGALLY BOUND BY ITS TERMS; AND (B) REPRESENT AND WARRANT THAT: (I)
            YOU ARE 18 YEARS OF AGE OR OLDER; AND (II) YOU HAVE THE RIGHT, POWER
            AND AUTHORITY TO ENTER INTO THIS AGREEMENT ON BEHALF OF LICENSEE AND
            BIND LICENSEE TO ITS TERMS. IF LICENSEE DOES NOT AGREE TO THE TERMS
            OF THIS AGREEMENT, LICENSOR WILL NOT AND DOES NOT LICENSE THE
            SOFTWARE TO LICENSEE, AND YOU MUST NOT DOWNLOAD OR INSTALL THE
            SOFTWARE OR RELATED DOCUMENTATION.
          </p>
          <p>
            NOTWITHSTANDING ANYTHING TO THE CONTRARY IN THIS AGREEMENT OR YOUR
            OR LICENSEE&apos;S ACCEPTANCE OF THE TERMS AND CONDITIONS OF THIS
            AGREEMENT, NO LICENSE IS GRANTED (WHETHER EXPRESSLY, BY IMPLICATION
            OR OTHERWISE) UNDER THIS AGREEMENT, AND THIS AGREEMENT EXPRESSLY
            EXCLUDES ANY RIGHT, CONCERNING ANY SOFTWARE THAT LICENSEE DID NOT
            ACQUIRE LAWFULLY OR THAT IS NOT A LEGITIMATE, AUTHORIZED COPY OF
            LICENSOR&apos;S SOFTWARE.
          </p>

          <ol type="1">
            <li>
              1. <u>Definitions</u>. For purposes of this Agreement, the
              following terms have the following meanings:
              <div>
                <ol className={styles.firstIndent}>
                  <li>
                    &quot;<b>Authorized Users</b>&quot; means the District
                    Attorneys of California and their authorized personnel in
                    their respective offices.
                  </li>
                  <li>
                    &quot;<b>Documentation</b>&quot; means user manuals,
                    technical manuals and any other materials provided by
                    Licensor, in printed, electronic or other form, that
                    describe the installation, operation, use or technical
                    specifications of the Software.
                  </li>
                  <li>
                    &quot;<b>Licensee</b>&quot; has the meaning set forth in the
                    preamble.
                  </li>
                  <li>
                    &quot;<b>Intellectual Property Rights</b>&quot; means any
                    and all registered and unregistered rights granted, applied
                    for or otherwise now or hereafter in existence under or
                    related to any patent, copyright, trademark, trade secret,
                    database protection or other intellectual property rights
                    laws, and all similar or equivalent rights or forms of
                    protection, in any part of the world.
                  </li>
                  <li>
                    &quot;<b>Licensor</b>&quot; has the meaning set forth in the
                    preamble.
                  </li>
                  <li>
                    &quot;<b>Download Form</b>&quot; means the electronic form
                    filled out and submitted by or on behalf of Licensee, and
                    accepted by Licensor, for Licensee&apos;s download of the
                    license for the Software granted under this Agreement.
                  </li>
                  <li>
                    &quot;<b>Open-Source Components</b>&quot; means any Licensor
                    or third-party software that is licensed, provided, or
                    distributed under any open-source license, including any
                    license meeting the Open Source Definition (as promulgated
                    by the Open Source Initiative) or the Free Software
                    Definition (as promulgated by the Free Software Foundation),
                    or any substantially similar license.
                  </li>
                  <li>
                    &quot;<b>Person</b>&quot; means an individual, corporation,
                    partnership, joint venture, limited liability company,
                    governmental authority, unincorporated organization, trust,
                    association or other entity
                  </li>
                  <li>
                    &quot;<b>Software</b>&quot; has the meaning set forth in the
                    preamble.
                  </li>
                  <li>
                    &quot;<b>Term</b>&quot; has the meaning set forth in{' '}
                    <b>Section 9</b>.
                  </li>
                  <li>
                    &quot;<b>Third Party</b>&quot; means any Person other than
                    Licensee or Licensor.
                  </li>
                  <li>
                    &quot;<b>Update</b>&quot; has the meaning set forth in{' '}
                    <b>Section 6(a)</b>.
                  </li>
                </ol>
              </div>
            </li>
            <li>
              2. <u>License Grant and Scope</u>. Subject to and conditioned upon
              Licensee&apos;s strict compliance with all terms and conditions
              set forth in this Agreement, Licensor hereby grants to Licensee a
              non-exclusive, non-transferable, non-sublicensable, limited
              license during the Term to use, solely by and through its
              Authorized Users, the Software and Documentation, solely as set
              forth in this <b>Section 2</b> and subject to all conditions and
              limitations set forth in <b>Section 4</b> or elsewhere in this
              Agreement. This license grants Licensee the right, exercisable
              solely by and through Licensee&apos;s Authorized Users, to:
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) Download and install in accordance with the Documentation
                  one or more copies of the Software on one or more computers,
                  in each case, owned or leased, and controlled by, Licensee. In
                  addition to the foregoing, Licensee has the right to make a
                  reasonable number of copies of the Software solely for
                  archival purposes and a reasonable number of copies of the
                  Software solely for backup purposes, provided that Licensee
                  shall not, and shall not allow any Person to, install or use
                  any such copy other than if and for so long as any copy
                  installed in accordance with the preceding sentence is
                  inoperable and, provided, further, that Licensee uninstalls
                  and otherwise deletes such inoperable copy(ies). All copies of
                  the Software made by the Licensee:
                  <ul type="i">
                    <li>(i) will be the exclusive property of the Licensor;</li>
                    <li>
                      (ii) will be subject to the terms and conditions of this
                      Agreement; and
                    </li>
                    <li>
                      (iii) must include all trademark, copyright, patent and
                      other notices of Intellectual Property Rights contained in
                      the original.
                    </li>
                  </ul>
                </li>
                <li>
                  (b) Use and run the Software as properly installed in
                  accordance with this Agreement and the Documentation, solely
                  as set forth in the Documentation and solely for
                  Licensee&apos;s internal purposes. Such use is permitted only
                  on the computer on which the Software is installed, at the
                  physical location thereof and not via any remote access or
                  other network.
                </li>
                <li>
                  (c) Download or otherwise make one or more copies of the
                  Documentation and use such Documentation, solely in support of
                  its licensed use of the Software in accordance herewith. All
                  copies of the Documentation made by Licensee:
                  <ul type="i">
                    <li>(i) will be the exclusive property of the Licensor;</li>
                    <li>
                      (ii) will be subject to the terms and conditions of this
                      Agreement; and
                    </li>
                    <li>
                      (iii) must include all trademark, copyright, patent and
                      other notices of Intellectual Property Rights contained in
                      the original.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>
            <li>
              3. <u>Third-Party Materials and Open-Source Components</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) The Software may include software, content, data or other
                  materials, including related documentation, that are owned by
                  Persons other than Licensor and that are provided to Licensee
                  on licensee terms that are in addition to and/or different
                  from those contained in this Agreement (&quot;
                  <b>Third-Party Licenses</b>&quot;). Licensee is bound by and
                  shall comply with all ThirdParty Licenses. Any breach by
                  Licensee or any of its Authorized Users of any Third-Party
                  License is also a breach of this Agreement.
                </li>
                <li>
                  (b) The Software may include Open-Source Components. Any use
                  of the OpenSource Components by Licensee shall be governed by
                  and is subject to, the terms and conditions of the applicable
                  open-source license agreements referenced in the applicable
                  distribution or the applicable help, notices, about or other
                  source files. Copyrights and other proprietary rights to the
                  Open-Source Components are held by the owners identified in
                  the applicable distribution or the applicable help, notices,
                  about or other source files.
                </li>
                <li>
                  (c) Open-Source license disclosures may be found at:{' '}
                  <a
                    href="https://github.com/codeforamerica/BEAR/blob/master/NOTICES.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    BEAR
                  </a>
                  ,{' '}
                  <a
                    href="https://github.com/codeforamerica/gogen/blob/master/NOTICE.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Gogen
                  </a>
                </li>
              </ol>
            </li>

            <li>
              4. <u>Use Restrictions</u>. Licensee shall not, and shall require
              its Authorized Users not to, directly or indirectly:
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) use (including make any copies of) the Software or
                  Documentation beyond the scope of the license granted under
                  <b>Section 2</b>;
                </li>
                <li>
                  (b) modify, translate, adapt or otherwise create derivative
                  works or improvements, whether or not patentable, of the
                  Software or Documentation or any part thereof;
                </li>
                <li>
                  (c) combine the Software or any part thereof with, or
                  incorporate the Software or any part thereof in, any other
                  programs;
                </li>
                <li>
                  (d) reverse engineer, disassemble, decompile, decode or
                  otherwise attempt to derive or gain access to the source code
                  of the Software or any part thereof;
                </li>
                <li>
                  (e) remove, delete, alter or obscure any trademarks or any
                  copyright, trademark, patent or other intellectual property or
                  proprietary rights notices provided on or with the Software or
                  Documentation, including any copy thereof;
                </li>
                <li>
                  (f) except as expressly set forth in <b>Section 2(a)</b> and{' '}
                  <b>Section 2(c)</b>, copy the Software or Documentation, in
                  whole or in part;
                </li>
                <li>
                  (g) rent, lease, lend, sell, sublicense, assign, distribute,
                  publish, transfer or otherwise make available the Software, or
                  any features or functionality of the Software, to any Third
                  Party for any reason, whether or not over a network or on a
                  hosted basis, including in connection with the internet or any
                  web hosting, wide area network (WAN), virtual private network
                  (VPN), virtualization, time-sharing, service bureau, software
                  as a service, cloud or other technology or service;
                </li>
                <li>
                  (h) use the Software or Documentation in, or in association
                  with, the design, construction, maintenance or operation of
                  any hazardous environments or systems, including:
                  <ul type="i">
                    <li>(i) power generation systems;</li>
                    <li>
                      (ii) aircraft navigation or communication systems, air
                      traffic control systems or any other transport management
                      systems;
                    </li>
                    <li>
                      (iii) safety-critical applications, including medical or
                      life-support systems, vehicle operation applications or
                      any police, fire or other safety response systems; and
                    </li>
                    <li>
                      (iv) military or aerospace applications, weapons systems
                      or environments;
                    </li>
                  </ul>
                </li>
                <li>
                  (i) use the Software or Documentation in violation of any law,
                  regulation or rule; or
                </li>
                <li>
                  (j) use the Software or Documentation for purposes of
                  competitive analysis of the Software, the development of a
                  competing software product or service or any other purpose
                  that is to the Licensor&apos;s commercial disadvantage.
                </li>
              </ol>
            </li>
            <li>
              5. <u>Responsibility for Use of Software</u>. Licensee is
              responsible and liable for all uses of the Software and
              Documentation through access thereto provided by Licensee,
              directly or indirectly. Specifically, and without limiting the
              generality of the foregoing, Licensee is responsible and liable
              for all actions and failures to take required actions with respect
              to the Software and Documentation by its Authorized Users or by
              any other Person to whom Licensee or an Authorized User may
              provide access to or use of the Software and/or Documentation,
              whether such access or use is permitted by or in violation of this
              Agreement.
            </li>
            <li>
              6. <u>Maintenance and Support</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) Subject to <b>Section 6(b)</b>, the Licensor may, at its
                  discretion, provide Licensee with basic software maintenance
                  and support services from time to time. These services may
                  include provision of such updates, upgrades, bug fixes,
                  patches and other error corrections (collectively, &quot;
                  <b>Updates</b>&quot;) as Licensor makes generally available
                  free of charge to all licensees of the Software then entitled
                  to maintenance and support services. Licensor may develop and
                  provide Updates in its sole discretion, and Licensee agrees
                  that Licensor has no obligation to develop any Updates at all
                  or for particular issues. Licensee further agrees that all
                  Updates will be deemed Software, and related documentation
                  will be deemed Documentation, all subject to all terms and
                  conditions of this Agreement. Licensee acknowledges that
                  Licensor may provide some or all Updates via download from a
                  website designated by Licensor and that Licensee&apos;s
                  receipt thereof will require an internet connection, which
                  connection is Licensee&apos;s sole responsibility. Licensor
                  has no obligation to provide Updates via any other media.
                  Maintenance and support services do not include any new
                  version or new release of the Software that Licensor may issue
                  as a separate or new product, and Licensor may determine
                  whether any issuance qualifies as a new version, new release
                  or Update in its sole discretion.
                </li>
                <li>
                  (b) Licensor has no obligation to provide maintenance and
                  support services, including Updates:
                  <ul type="i">
                    <li>
                      (i) for any but the most current version or release of the
                      Software;{' '}
                    </li>
                    <li>
                      (ii) for any copy of Software for which all previously
                      issued Updates have not been installed;
                    </li>
                    <li>
                      (iii) if Licensee is in breach under this Agreement; or
                    </li>
                    <li>
                      (iv) for any Software that has been modified other than by
                      or with the authorization of Licensor, or that is being
                      used with any hardware, software, configuration or
                      operating system not specified in the Documentation or
                      expressly authorized by Licensor in writing.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>

            <li>
              7. <u>Collection and Use of Information</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) Licensee acknowledges that Licensor may from time to time
                  request Licensee provide Licensor with information regarding
                  the Licensee’s use of the Software, which Licensee may choose
                  to provide at its sole discretion. Licensee will only provide
                  such information when Licensee has sufficient authorization
                  and consents to do so under applicable law.
                </li>
                <li>
                  (b) Licensee agrees that the Licensor may use such information
                  for any purpose related to any use of the Software by Licensee
                  or on Licensee&apos;s equipment, including but not limited to:
                  <ul type="i">
                    <li>
                      (i) improving the performance of the Software or
                      developing Updates; and
                    </li>
                    <li>
                      (ii) verifying Licensee&apos;s compliance with the terms
                      of this Agreement and enforcing the Licensor&apos;s
                      rights, including all Intellectual Property Rights in and
                      to the Software.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>
            <li>
              8. <u>Intellectual Property Rights</u>. Licensee acknowledges and
              agrees that the Software and Documentation are provided under
              license, and not sold, to Licensee. Licensee does not acquire any
              ownership interest in the Software or Documentation under this
              Agreement, or any other rights thereto other than to use the same
              in accordance with the license granted, and subject to all terms,
              conditions and restrictions, under this Agreement. Licensor
              reserve and shall retain its entire right, title and interest in
              and to the Software and all Intellectual Property Rights arising
              out of or relating to the Software, except as expressly granted to
              the Licensee in this Agreement. Licensee shall safeguard all
              Software (including all copies thereof) from infringement,
              misappropriation, theft, misuse or unauthorized access.{' '}
            </li>

            <li>
              9. <u>Term and Termination</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) This Agreement and the license granted hereunder shall
                  remain in effect until terminated as set forth herein (the
                  &quot;<b>Term</b>&quot;).
                </li>
                <li>
                  (b) Licensee may terminate this Agreement by ceasing to use
                  and destroying all copies of the Software and Documentation.
                </li>
                <li>
                  (c) Licensor may terminate this Agreement, effective upon
                  written notice to Licensee, if Licensee, materially breaches
                  this Agreement and such breach:
                  <ul type="i">
                    <li>(i) is incapable of cure; or </li>
                    <li>
                      (ii) being capable of cure, remains uncured for thirty
                      (30) days after Licensor provides written notice thereof.
                    </li>
                  </ul>
                </li>
                <li>
                  (d) Upon expiration or earlier termination of this Agreement,
                  the license granted hereunder shall also terminate, and
                  Licensee shall cease using and destroy all copies of the
                  Software and Documentation.
                </li>
              </ol>
            </li>

            <li>
              10. <u>Disclaimer of Warranties</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) THE SOFTWARE AND DOCUMENTATION ARE PROVIDED TO LICENSEE
                  &quot;AS IS&quot; AND WITH ALL FAULTS AND DEFECTS WITHOUT
                  WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED UNDER
                  APPLICABLE LAW, LICENSOR, ON ITS OWN BEHALF AND ON BEHALF OF
                  ITS AFFILIATES AND ITS AND THEIR RESPECTIVE LICENSORS AND
                  SERVICE PROVIDERS, EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER
                  EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, WITH RESPECT TO THE
                  SOFTWARE AND DOCUMENTATION, INCLUDING ALL IMPLIED WARRANTIES
                  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE
                  AND NON-INFRINGEMENT, AND WARRANTIES THAT MAY ARISE OUT OF
                  COURSE OF DEALING, COURSE OF PERFORMANCE, USAGE OR TRADE
                  PRACTICE. WITHOUT LIMITATION TO THE FOREGOING, THE LICENSOR
                  PROVIDES NO WARRANTY OR UNDERTAKING, AND MAKES NO
                  REPRESENTATION OF ANY KIND THAT THE LICENSED SOFTWARE WILL
                  MEET THE LICENSEE&apos;S REQUIREMENTS, ACHIEVE ANY INTENDED
                  RESULTS, BE COMPATIBLE OR WORK WITH ANY OTHER SOFTWARE,
                  APPLICATIONS, SYSTEMS OR SERVICES, OPERATE WITHOUT
                  INTERRUPTION, MEET ANY PERFORMANCE OR RELIABILITY STANDARDS OR
                  BE ERROR FREE OR THAT ANY ERRORS OR DEFECTS CAN OR WILL BE
                  CORRECTED.
                </li>
              </ol>
            </li>
            <li>
              11. <u>Limitation of Liability</u>. TO THE FULLEST EXTENT
              PERMITTED UNDER APPLICABLE LAW:
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) IN NO EVENT WILL LICENSOR OR ITS AFFILIATES, OR ANY OF ITS
                  OR THEIR RESPECTIVE LICENSORS OR SERVICE PROVIDERS, BE LIABLE
                  TO LICENSEE OR ANY THIRD PARTY FOR ANY USE, INTERRUPTION,
                  DELAY OR INABILITY TO USE THE SOFTWARE, LOST REVENUES OR
                  PROFITS, DELAYS, INTERRUPTION OR LOSS OF SERVICES, BUSINESS OR
                  GOODWILL, LOSS OR CORRUPTION OF DATA, LOSS RESULTING FROM
                  SYSTEM OR SYSTEM SERVICE FAILURE, MALFUNCTION OR SHUTDOWN,
                  FAILURE TO ACCURATELY TRANSFER, READ OR TRANSMIT INFORMATION,
                  FAILURE TO UPDATE OR PROVIDE CORRECT INFORMATION, SYSTEM
                  INCOMPATIBILITY OR PROVISION OF INCORRECT COMPATIBILITY
                  INFORMATION OR BREACHES IN SYSTEM SECURITY, OR FOR ANY
                  CONSEQUENTIAL, INCIDENTAL, INDIRECT, EXEMPLARY, SPECIAL OR
                  PUNITIVE DAMAGES, WHETHER ARISING OUT OF OR IN CONNECTION WITH
                  THIS AGREEMENT, BREACH OF CONTRACT, TORT (INCLUDING
                  NEGLIGENCE) OR OTHERWISE, REGARDLESS OF WHETHER SUCH DAMAGES
                  WERE FORESEEABLE AND WHETHER OR NOT THE LICENSOR WAS ADVISED
                  OF THE POSSIBILITY OF SUCH DAMAGES.
                </li>
                <li>
                  (b) IN NO EVENT WILL LICENSOR&apos;S AND ITS AFFILIATES&apos;,
                  INCLUDING ANY OF ITS OR THEIR RESPECTIVE LICENSORS&apos; AND
                  SERVICE PROVIDERS&apos;, COLLECTIVE AGGREGATE LIABILITY UNDER
                  OR IN CONNECTION WITH THIS AGREEMENTOR ITS SUBJECT MATTER,
                  UNDER ANY LEGAL OR EQUITABLE THEORY, INCLUDING BREACH OF
                  CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY AND
                  OTHERWISE, EXCEED THE TOTAL AMOUNT PAID TO THE LICENSOR
                  PURSUANT TO THIS AGREEMENT FOR THE SOFTWARE THAT IS THE
                  SUBJECT OF THE CLAIM.
                </li>
                <li>
                  (c) THE LIMITATIONS SET FORTH IN SECTION 11(A) AND SECTION
                  11(B) SHALL APPLY EVEN IF THE LICENSEE&apos;S REMEDIES UNDER
                  THIS AGREEMENT FAIL OF THEIR ESSENTIAL PURPOSE.
                </li>
              </ol>
            </li>
            <li>
              12. <u>Export Regulation</u>. The Software and Documentation may
              be subject to U.S. export control laws, including the U.S. Export
              Administration Act and its associated regulations. The Licensee
              shall not, directly or indirectly, export, re-export or release
              the Software or Documentation to, or make the Software or
              Documentation accessible from, any jurisdiction or country to
              which export, re-export or release is prohibited by law, rule or
              regulation. The Licensee shall comply with all applicable federal
              and state laws, regulations and rules, and complete all required
              undertakings (including obtaining any necessary export license or
              other governmental approval), prior to exporting, re-exporting,
              releasing or otherwise making the Software or Documentation
              available outside the United States or the State of California.
            </li>
            <li>
              13. <u>U.S. Government Rights</u>. The Software is commercial
              computer software, as such term is defined in 48 C.F.R. §2.101.
              Accordingly, if the Licensee is the U.S. Government or any
              contractor therefor, Licensee shall receive only those rights with
              respect to the Software and Documentation as are granted to all
              other end users under license, in accordance with (a) 48 C.F.R.
              §227.7201 through 48 C.F.R. §227.7204, with respect to the
              Department of Defense and their contractors, or (b) 48 C.F.R.
              §12.212, with respect to all other U.S. Government licensees and
              their contractors.{' '}
            </li>
            <li>
              14. <u>Dispute Resolution and Arbitration</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) <u>Generally</u>. In the interest of resolving disputes
                  between Licensee and Licensor in the most expedient and
                  cost-effective manner, and except as described in{' '}
                  <b>Section 14(b)</b> and Section 14(c), Licensee and Licensor
                  agree that every dispute arising in connection with this
                  Agreement will be resolved by binding arbitration. Arbitration
                  is less formal than a lawsuit in court. Arbitration uses a
                  neutral arbitrator instead of a judge or jury, may allow for
                  more limited discovery than in court, and can be subject to
                  very limited review by courts. Arbitrators can award the same
                  damages and relief that a court can award. This agreement to
                  arbitrate disputes includes all claims arising out of or
                  relating to any aspect of this Agreement, whether based in
                  contract, tort, statute, fraud, misrepresentation, or any
                  other legal theory, and regardless of whether a claim arises
                  during or after the termination of this Agreement. LICENSEE
                  UNDERSTANDS AND AGREES THAT, BY ENTERING INTO THIS AGREEMENT,
                  LICENSEE AND LICENSOR ARE EACH WAIVING THE RIGHT TO A TRIAL BY
                  JURY OR TO PARTICIPATE IN A CLASS ACTION.
                </li>
                <li>
                  (b) <u>Exceptions</u>. Despite the provisions of{' '}
                  <b>Section 14(a)</b>, nothing in this Agreement will be deemed
                  to waive, preclude, or otherwise limit the right of either
                  party to: (i) bring an individual action in small claims
                  court; (ii) pursue an enforcement action through the
                  applicable federal, state, or local agency if that action is
                  available; (iii) seek injunctive relief in a court of law in
                  aid of arbitration; or (iv) to file suite in a court of law to
                  address an intellectual property infringement claim.
                </li>
                <li>
                  (c) <u>Opt-Out</u>. If Licensee does not wish to resolve
                  disputes by binding arbitration, Licensee may opt out of the
                  provisions of this <b>Section 14</b> within thirty (30) days
                  after the date that Licensee agrees to the Agreement by
                  sending a letter to Code for America Labs, Inc., Attention:
                  Legal Department—Arbitration Opt-Out, 972 Mission St., 5th
                  floor, San Francisco, CA 94103, that specifies that Licensee
                  wishes to opt out of arbitration (&quot;“<b>Opt-Out Notice</b>
                  &quot;”). Once Licensor receives Licensee’s Opt-Out Notice,
                  this <b>Section 14</b> will be void and any action arising out
                  of this Agreement will be resolved as set forth in{' '}
                  <b>Section 15(a)</b>. The remaining provisions of this
                  Agreement will not be affected by Licensee’s Opt-Out Notice.
                </li>
                <li>
                  (d) <u>Arbitrator</u>. Any arbitration between Licensee and
                  Licensor will be settled under the Federal Arbitration Act and
                  administered by the American Arbitration Association (“
                  <b>AAA</b>”) under tis Consumer Arbitration Rules
                  (collectively, “<b>AAA Rules</b>”) as modified by this
                  Agreement. The AAA Rules and filing forms are available at{' '}
                  <a
                    href="https://www.adr.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.adr.org
                  </a>
                  , by calling the AAA at 1-800-778-7879, or by contacting
                  Licensor. The arbitrator has exclusive authority to resolve
                  any dispute relating to the interpretation, applicability, or
                  enforceability of this binding arbitration agreement.
                </li>
                <li>
                  (e) <u>Notice of Arbitration; Process</u>. A party who intends
                  to seek arbitration must first send a written notice of the
                  dispute to the other party by certified U.S. Mail or by
                  Federal Express (signature required) or, only if that other
                  party has not provided a current physical address, then by
                  electronic mail (“<b>Notice of Arbitration</b>”). Licensor’s
                  address for Notice is Code for America Labs, Inc., Attention:
                  Legal Department, 972 Mission St., 5th floor, San Francisco,
                  CA 94103. The Notice of Arbitration must (i) describe the
                  nature and basis of the claim or dispute and (ii) set forth
                  the specific relief sought (“<b>Demand</b>”). The parties will
                  make good faith efforts to resolve the claim directly, but if
                  the parties do not reach an agreement to do so within thirty
                  (30) days after the Notice of Arbitration is received,
                  Licensee or Licensor may commence an arbitration proceeding.
                  All arbitration proceedings between the parties will be
                  confidential unless otherwise agreed by the parties in
                  writing. During the arbitration, the amount of any settlement
                  offer made by Licensee or Licensor must not be disclosed to
                  the arbitrator until after the arbitrator makes a final
                  decision and award, if any. If the arbitrator awards Licensee
                  an amount higher than the last written settlement amount
                  offered by Licensor in settlement of the dispute prior to the
                  award, Licensor will pay Licensee the higher of (A) the amount
                  awarded by the arbitrator or (B) $[1,000].
                </li>
                <li>
                  (f) <u>Fees</u>. If Licensee commences arbitration in
                  accordance with this Agreement, Licensor will reimburse
                  Licensee for Licensee’s payment of the filing fee, unless
                  Licensee’s claim is for more than $10,000, in which case the
                  payment of any fees will be decided by AAA Rules. Any
                  arbitration hearing will take place at a location to be agreed
                  upon in San Francisco County, California, but if the claim is
                  for $10,000 or less, Licensee may choose whether the
                  arbitration will be conducted (i) solely on the basis of
                  documents submitted to the arbitrator or (ii) through a
                  non-appearance-based telephone hearing. If the arbitrator
                  finds that either the substance of Licensee’s claim or the
                  relief sought in the Demand is frivolous or brought for an
                  improper purpose (as measured by the standards set forth in
                  Federal Rule of Civil Procedure 11(b)), then the payment of
                  all fees will be governed by the AAA Rules. In that case,
                  Licensee agrees to reimburse Licensor for all monies
                  previously disbursed by it that are otherwise Licensee’s
                  obligation to pay under the AAA Rules. Regardless of the
                  manner in which the arbitration is conducted, the arbitrator
                  must issue a reasoned written decision sufficient to explain
                  the essential findings and conclusions on which the decision
                  and award, if any, are based. The arbitrator may make rulings
                  and resolve disputes as to the payment and reimbursement of
                  fees or expenses at any time during the proceeding and upon
                  request from either party made within fourteen (14) days of
                  the arbitrator’s ruling on the merits.
                </li>
                <li>
                  (g) <u>No Class Actions</u>. LICENSEE AND LICENSOR AGREE THAT
                  EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN LICENSEE’S OR
                  LICENSOR’S INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS
                  MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                  Further, unless both Licensee and Licensor agree otherwise,
                  the arbitrator may not consolidate more than one person’s
                  claims and may not otherwise preside over any form of a
                  representative or class proceeding.
                </li>
                <li>
                  (h) <u>Enforceability</u>. If <b>Section 14(g)</b> or the
                  entirety of this
                  <b>Section 14</b> is found to be unenforceable, or if Licensor
                  receives an Opt-Out Notice from Licensee, then the entirety of
                  this Section 14 will be null and void and, in that case, the
                  exclusive jurisdiction and venue described in{' '}
                  <b>Section 15(a)</b>
                  will govern any action arising out of or related to this
                  Agreement.
                </li>
              </ol>
            </li>
            <li>
              15. <u>Miscellaneous</u>.
              <ol className={styles.firstIndent} type="a">
                <li>
                  (a) This Agreement is governed by the laws of the State of
                  California without regard to conflict of law principles.
                  Licensee and Licensor submit to the personal and exclusive
                  jurisdiction of the courts located within San Francisco
                  County, California for resolution of any lawsuit or court
                  proceeding permitted under this Agreement.
                </li>
                <li>
                  (b) Licensor will not be responsible or liable to Licensee, or
                  deemed in default or breach hereunder by reason of any failure
                  or delay in the performance of its obligations hereunder where
                  such failure or delay is due to strikes, labor disputes, civil
                  disturbances, riot, rebellion, invasion, epidemic,
                  hostilities, war, terrorist attack, embargo, natural disaster,
                  acts of God, flood, fire, sabotage, fluctuations or
                  non-availability of electrical power, heat, light, air
                  conditioning or Licensee equipment, loss and destruction of
                  property or any other circumstances or causes beyond
                  Licensor&apos;s reasonable control.
                </li>
                <li>
                  (c) All notices, requests, consents, claims, demands, waivers
                  and other communications hereunder shall be in writing and
                  shall be deemed to have been given: (i) when delivered by hand
                  (with written confirmation of receipt); (ii) when received by
                  the addressee if sent by a nationally recognized overnight
                  courier (receipt requested); (iii) on the date sent by
                  facsimile or e-mail of a PDF document (with confirmation of
                  transmission) if sent during normal business hours of the
                  recipient, and on the next business day if sent after normal
                  business hours of the recipient; or (iv) on the third day
                  after the date mailed, by certified or registered mail, return
                  receipt requested, postage prepaid. Such communications must
                  be sent to the respective parties at the addresses set forth
                  on the Download Form (or to such other address as may be
                  designated by a party from time to time in accordance with
                  this <b>Section 15(c)</b>).
                </li>
                <li>
                  (d) This Agreement, together with the Download Form,
                  constitutes the sole and entire agreement between Licensee and
                  Licensor with respect to the subject matter contained herein,
                  and supersedes all prior and contemporaneous understandings,
                  agreements, representations and warranties, both written and
                  oral, with respect to such subject matter.
                </li>
                <li>
                  (e) Licensee shall not assign or otherwise transfer any of its
                  rights, or delegate or otherwise transfer any of its
                  obligations or performance, under this Agreement, in each case
                  whether voluntarily, involuntarily, by operation of law or
                  otherwise, without Licensor&apos;s prior written consent,
                  which consent Licensor may give or withhold in its sole
                  discretion. For purposes of the preceding sentence, and
                  without limiting its generality, any merger, consolidation or
                  reorganization involving Licensee (regardless of whether
                  Licensee is a surviving or disappearing entity) will be deemed
                  to be a transfer of rights, obligations or performance under
                  this Agreement for which Licensor&apos;s prior written consent
                  is required. No delegation or other transfer will relieve
                  Licensee of any of its obligations or performance under this
                  Agreement. Any purported assignment, delegation or transfer in
                  violation of this <b>Section 15(e)</b> is void. Licensor may
                  freely assign or otherwise transfer all or any of its rights,
                  or delegate or otherwise transfer all or any of its
                  obligations or performance, under this Agreement without
                  Licensee&apos;s consent. This Agreement is binding upon and
                  inures to the benefit of the parties hereto and their
                  respective permitted successors and assigns.
                </li>
                <li>
                  (f) This Agreement is for the sole benefit of the parties
                  hereto and their respective successors and permitted assigns
                  and nothing herein, express or implied, is intended to or
                  shall confer on any other Person any legal or equitable right,
                  benefit or remedy of any nature whatsoever under or by reason
                  of this Agreement.
                </li>
                <li>
                  (g) This Agreement may only be amended, modified or
                  supplemented by an agreement in writing signed by each party
                  hereto. No waiver by any party of any of the provisions hereof
                  shall be effective unless explicitly set forth in writing and
                  signed by the party so waiving. Except as otherwise set forth
                  in this Agreement, no failure to exercise, or delay in
                  exercising, any right, remedy, power or privilege arising from
                  this Agreement shall operate or be construed as a waiver
                  thereof; nor shall any single or partial exercise of any
                  right, remedy, power or privilege hereunder preclude any other
                  or further exercise thereof or the exercise of any other
                  right, remedy, power or privilege.
                </li>
                <li>
                  (h) If any term or provision of this Agreement is invalid,
                  illegal or unenforceable in any jurisdiction, such invalidity,
                  illegality or unenforceability shall not affect any other term
                  or provision of this Agreement or invalidate or render
                  unenforceable such term or provision in any other
                  jurisdiction.
                </li>
                <li>
                  (i) For purposes of this Agreement, (i) the words
                  &quot;include,&quot; &quot;includes&quot; and
                  &quot;including&quot; shall be deemed to be followed by the
                  words &quot;without limitation&quot;; (ii) the word
                  &quot;or&quot; is not exclusive; and (iii) the words
                  &quot;herein,&quot; &quot;hereof,&quot; &quot;hereby,&quot;
                  &quot;hereto&quot; and &quot;hereunder&quot; refer to this
                  Agreement as a whole. Unless the context otherwise requires,
                  references herein: (A) to Sections refer to the Sections of
                  this Agreement; (B) to an agreement, instrument or other
                  document means such agreement, instrument or other document as
                  amended, supplemented and modified from time to time to the
                  extent permitted by the provisions thereof; and (C) to a
                  statute means such statute as amended from time to time and
                  includes any successor legislation thereto and any regulations
                  promulgated thereunder. This Agreement shall be construed
                  without regard to any presumption or rule requiring
                  construction or interpretation against the party drafting an
                  instrument or causing any instrument to be drafted. The
                  Download Form referred to herein shall be construed with, and
                  as an integral part of, this Agreement to the same extent as
                  if they were set forth verbatim herein.
                </li>
                <li>
                  (j) The headings in this Agreement are for reference only and
                  do not affect the interpretation of this Agreement.
                </li>
              </ol>
            </li>
          </ol>
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
