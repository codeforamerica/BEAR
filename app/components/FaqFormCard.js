// @flow
import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import GoBackButton from './GoBackButton';
import styles from './FaqFormCard.css';

type Props = {
  onBack: () => void
};

export default class FaqFormCard extends Component<Props> {
  render() {
    const { onBack } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          Frequently asked questions
          <div className={styles.headerText}>
            <i>Last updated: August 30th, 2019 </i>
            <br />
            If you have more questions, you can refer to the blueprint that
            accompanies our application by downloading it{' '}
            <a
              href="https://s3-us-west-1.amazonaws.com/codeforamerica-cms1/documents/Blueprint-FINAL.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            , or checking for updates to our FAQ on our{' '}
            <a
              href="https://s3-us-west-1.amazonaws.com/codeforamerica-cms1/documents/1793-FAQ-page-copy-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              website
            </a>
            . The DOJ has also created guides to help counties understand the
            bulk Proposition 64 conviction data format, which you can download{' '}
            <a
              href="http://s3-us-west-1.amazonaws.com/codeforamerica-cms1/documents/DOJ-File-Format-Specification.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            . You can also contact us at{' '}
            <a
              href="mailto:clearmyrecord@codeforamerica.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              clearmyrecord@codeforamerica.org
            </a>{' '}
            for additional support.
          </div>
        </FormCardHeader>
        <FormCardContent>
          <h4>Using the application</h4>
          <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  How do I use the application?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                <ol className={styles.numberedList}>
                  <li>Download the application from our website.</li>
                  <li>Open the clearmyrecord-hs_11361-setup.exe.</li>
                  <li>Select your county.</li>
                  <li>
                    Import the bulk Proposition 64 data file that you received
                    from the DOJ through their secure ftp portal. Ensure that
                    you have not edited the file before importing.
                  </li>
                  <li>
                    Move through each screen to make eligibility determinations.
                  </li>
                  <li>
                    View your output files to see which convictions have been
                    determined eligible for dismissal and/or reduction.
                  </li>
                  <li>
                    You may run the application as many times as you’d like to
                    compare the effects of different eligibility criteria. If
                    you run the program multiple times, your results will be
                    saved in a separate folder inside of the main
                    “Clear_My_Record_output” folder on your desktop, marked with
                    the date and time that you ran the application.
                  </li>
                </ol>
                If you have additional questions on how to use this application,
                visit{' '}
                <a
                  href="https://info.codeforamerica.org/clear-my-record-toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  our website
                </a>{' '}
                to download the blueprint or contact us at{' '}
                <a
                  href="mailto:clearmyrecord@codeforamerica.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clearmyrecord@codeforamerica.org
                </a>{' '}
                for additional support.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  What is in the DOJ file?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                The file that you received from the DOJ contains the full RAP
                sheet of any individual with a Prop 64 conviction in your
                county. For each conviction, it contains all of the information
                the DOJ has in their internal system. This means that you may
                see convictions that are not Proposition 64 convictions or
                convictions not in your county. We use all of this information
                to create our eligibility determinations based on your selected
                criteria.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  Where can I find my DOJ file?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                You should have received an email from the DOJ with instructions
                on how to access your data. This includes personalized
                instructions for your county with an account name and password.
                You will have to download FileZilla, a secure file transfer
                portal. Once you’ve downloaded FileZilla, you can use the
                instructions in the DOJ email for your personalized portal and
                download the necessary data. After downloading your data file,
                delete FileZilla serve to ensure security.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  Why isn’t my file importing correctly?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                There are several possible reasons why your file has not been
                imported correctly. It may be that the file was opened
                previously and not saved correctly, or a change was made to the
                file so we can no longer read the information that we need to.
                Make sure that you have uploaded the correct file, which
                includes all Proposition 64 convictions as you received it from
                the DOJ, without any modifications. If you have additional
                problems, contact us at{' '}
                <a
                  href="mailto:clearmyrecord@codeforamerica.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clearmyrecord@codeforamerica.org
                </a>
                .
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  What do output files look like?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                We provide you with four output files, each with a timestamp
                that marks when you completed running the application:
                <ol className={styles.numberedList}>
                  <li>
                    “Summary_report_[timestamp].pdf”: A summary of how you ran
                    the application including selected eligibility criteria and
                    impact statistics.
                  </li>
                  <li>
                    “Prop64_results_[timestamp].csv”: Since the DOJ file
                    includes data from the individual&apos;s entire RAP sheet,
                    this spreadsheet condenses the data only to Proposition 64
                    convictions in your county. The first several columns (A
                    through CQ) come straight from the original DOJ file. The
                    remaining columns are generated by Code for America to
                    surface more insights for DAs (the final two being the
                    reduction or dismissal decision).
                  </li>
                  <li>
                    “All_Results_Condensed_[timestamp].csv”: This spreadsheet
                    condenses some of the columns from the full results file to
                    make it easier for DA’s offices to review the data on an
                    individual’s entire CA criminal record history.
                  </li>
                  <li>
                    “All_Results_[timestamp].csv”: This spreadsheet is the
                    entire DOJ file (columns A through CQ) plus all of the
                    supporting information that Code for America generates.
                  </li>
                </ol>
                All of these files will be saved in a folder on your desktop
                named “Clear_My_Record_output”. Each time you run the
                application, a new folder will be created within this folder
                labeled with a timestamp of when they were created.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  What are different ways I can view my data files?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                <p>
                  When you have large data files, you can use the filter
                  function in Excel to look only at particular data. For
                  example, this function can help you see only those convictions
                  eligible for dismissal or reduction. To filter, select the
                  Data tab, and dropdown arrows should appear in each of the
                  columns. Click on the arrow next to the column you’d like to
                  filter by and a menu should appear allowing you to filter by
                  the relevant inputs of that column. You can then choose the
                  options you are interested in and only see the data relevant
                  to those choices.
                </p>
                <p>
                  It may also be useful to freeze the rows in these files to see
                  the header at all times. You can do this by selecting the row
                  right below the row you want to freeze, going to the View tab,
                  and selecting the Freeze option. This should allow you to see
                  the headers of the DOJ file even if you are further down in
                  the data file.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  How can I use this application to update court records?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                We have provided you with output files that have the base
                information needed for courts to update corresponding
                convictions in their CMS. The pilot counties we worked with did
                not need individual motions for each conviction, but rather one
                bulk motion signed by a presiding judge. You can refer to our
                Blueprint for instructions on providing eligibility
                determinations to your court.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  How can I share my results publicly?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                We provide you with a summary report that has impact statistics
                based on your eligibility criteria. If you share this report
                with us (which helps us better understand how counties use the
                application), we will provide you with a designed report that
                you can share with the press or community organizations. See an
                example of this designed report we’ll create for you{' '}
                <a
                  href="https://s3-us-west-1.amazonaws.com/codeforamerica-cms1/documents/Clear-My-Record_-Implementation-Application-Impact-Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                . You can send the summary report to us at{' '}
                <a
                  href="mailto:clearmyrecord@codeforamerica.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clearmyrecord@codeforamerica.org
                </a>
                .
              </AccordionItemPanel>
            </AccordionItem>
            <h4>Eligibility criteria</h4>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  Why are these the choices available as eligibility criteria?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                H&S § 11361.8 has a presumption of eligibility for those
                convictions eligible for relief. The eligibility criteria
                choices within the application are based on the criteria chosen
                by the district attorneys in our five-county pilot with San
                Francisco, Sacramento, Contra Costa, San Joaquin, and Los
                Angeles.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  What if I wanted to add another eligibility criteria?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                Our technology does not provide the option to add additional
                eligibility criteria. However, there is additional information
                that we surface in the results file that can help in making your
                final eligibility determination. This information includes the
                following:
                <ul className={styles.bulletedList}>
                  <li>Number of convictions on the individual’s record</li>
                  <li>
                    Charges that our software detected may also be possible
                    Proposition 64 convictions
                  </li>
                  <li>
                    Convictions listed under PC 667 or PC 290 or if the
                    individual is registered under PC 290
                  </li>
                  <li>Date of the Proposition 64 conviction</li>
                  <li>Whether the conviction happened after 11/9/2016</li>
                  <li>Number of years since this Proposition 64 conviction</li>
                  <li>
                    Number of years since any conviction on the individual’s
                    record
                  </li>
                  <li>
                    Number of H&S § 11357, H&S § 11358, H&S § 11359, and/or H&S
                    § 11360 convictions on the individual’s record
                  </li>
                  <li>
                    Total number of Proposition 64 convictions on the
                    individual’s record
                  </li>
                  <li>
                    Whether the individual has been marked as deceased in the
                    data set
                  </li>
                </ul>
                If you are looking for additional information, you can find all
                the original DOJ data still included in our output files.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  What code sections are included in “Misdemeanors and
                  infractions under Prop 64”?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                This includes all misdemeanors and infractions convicted under
                H&S § 11357, H&S § 11358, H&S § 11359, and H&S § 11360, and all
                their relevant subsections.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  How does the application analyze convictions for eligibility?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                Our automatic record clearance technology is based off of simple
                flow-chart logic. We analyze your bulk data file, scanning for
                and identifying every Proposition 64 eligibility conviction
                based on criteria selected. You can view our code used to create
                this application, which we have open sourced,{' '}
                <a
                  href="https://github.com/codeforamerica/BEAR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </AccordionItemPanel>
            </AccordionItem>
            <h4>Data safety and accuracy</h4>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  How can I ensure that my data is safe?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                This entire application does not communicate with the internet
                and we never save your data externally. This means that we
                cannot access your data. You can also run this application on a
                non-networked machine if desired.
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>
                  Why did I find discrepancies between data sets?
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                <p>
                  There may be times when you find discrepancies in your data
                  between the DOJ file and your internal case management system
                  or later on in the court case management system. Because we
                  cannot see your data, we cannot be certain why these
                  discrepancies are happening, but there are a few common
                  reasons.
                </p>
                <p>
                  We have found that there are inconsistencies with court
                  disposition reporting or changes that the DOJ has made to
                  their data. There may be times when a code section has been
                  entered incorrectly, or case information is located in the
                  comments rather than directly in the data. Because we do not
                  change the DOJ data directly, you can investigate these
                  discrepancies in your output files themselves and speak to the
                  DOJ and/or courts when necessary.
                </p>
                <p>
                  You can also find more information about what to do when you
                  find data discrepancies in our accompanying Blueprint.
                </p>
              </AccordionItemPanel>
            </AccordionItem>
            <h4>About us</h4>
            <AccordionItem>
              <AccordionItemHeading className={styles.accordionHeading}>
                <AccordionItemButton>Who are we?</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={styles.accordionPanel}>
                Technology and government are the two biggest levers for
                improving people’s lives at scale.{' '}
                <a
                  href="https://www.codeforamerica.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code for America
                </a>{' '}
                puts them together so that government can work for the people,
                by the people in the digital age. Since 2011, we’ve helped
                hundreds of local and state governments take a user-centered,
                iterative, and data-driven approach to solving problems. The
                technology and services that we provide make it possible for
                government to expedite their review of convictions and provide
                relief automatically at an exponentially faster pace and with
                significant cost savings. Our goal: a 21st century government
                that effectively and equitably serves all Americans.
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
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
