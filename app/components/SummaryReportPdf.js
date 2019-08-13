// @flow
import React, { Component } from 'react';
import { Document, Text, Page, View, Image } from '@react-pdf/renderer';
import path from 'path';
import styles from './SummaryReportPdfStyles';
import {
  formatCountsByCodeSection,
  formatCountsByAdditionalRelief,
  formatDateTime,
  toTitleCase
} from '../utils/writeSummaryOutputUtils';

type Props = {
  summaryData: object,
  inputFileCount: number
};

const imageDirectory = path.join(__dirname, '/assets/images/');

export default class SummaryReportPdf extends Component<Props> {
  render() {
    const { summaryData, inputFileCount } = this.props;
    const totalProp64Convictions =
      summaryData.prop64FelonyConvictionsCountInCounty +
      summaryData.prop64MisdemeanorConvictionsCountInCounty;
    const formattedCountyName = toTitleCase(summaryData.county);
    return (
      <Document>
        <Page>
          <View style={styles.header}>
            <Image
              src={path.join(imageDirectory, 'cmr_logo_black_cropped.png')}
              style={styles.logoImage}
              safePath={imageDirectory}
            />
            <View style={styles.headerText}>
              <Text style={styles.tinyText}>
                Clear My Record is a service delivered by Code for America.
              </Text>
              <Text style={styles.tinyText}>
                For more information contact clearmyrecord@codeforamerica.org
              </Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.h1}>
              Summary Report: {formattedCountyName} County
            </Text>
            <Text style={styles.text}>
              This report was generated by Clear My Record on
              <Text style={styles.boldText}>{formatDateTime()}</Text>
              <Text style={styles.text}> for </Text>
              <Text style={styles.boldText}>{formattedCountyName} County</Text>.
            </Text>
            <View>
              <Text style={styles.h2}>
                Background on the file that California DOJ provided to{' '}
                {formattedCountyName} County:
              </Text>
              <Text style={styles.text}>
                DOJ provided a spreadsheet with the entire CA criminal record
                history for every individual convicted of H&S § 11357, H&S §
                11358, H&S § 11359, and/or H&S § 11360 in {formattedCountyName}{' '}
                County since {summaryData.earliestConviction}.
              </Text>
              <View style={styles.pageBreak} />
            </View>
            <View>
              <Text style={styles.h2}>
                What Clear My Record’s technology was able to do:
              </Text>
              <Text style={styles.text}>
                Based on your office&apos;s eligibility choices, this
                application processed {summaryData.lineCount} lines of data in{' '}
                {summaryData.processingTimeInSeconds} seconds and produced{' '}
                {inputFileCount * 3} spreadsheets to assist with your office’s
                review.
              </Text>
            </View>
            <View>
              <Text style={styles.h3}>Based on your eligibility choices:</Text>
              <Text style={styles.listItem}>
                {
                  summaryData.reliefWithCurrentEligibilityChoices
                    .CountSubjectsNoFelony
                }{' '}
                people will no longer have a felony on their CA record
              </Text>
              <Text style={styles.listItem}>
                {
                  summaryData.reliefWithCurrentEligibilityChoices
                    .CountSubjectsNoConvictionLast7Years
                }{' '}
                people will no longer have any conviction on their CA record in
                the last 7 years
              </Text>
              <Text style={styles.listItem}>
                {
                  summaryData.reliefWithCurrentEligibilityChoices
                    .CountSubjectsNoConviction
                }{' '}
                people will no longer have any conviction on their CA record
              </Text>
            </View>
            <View>
              <Text style={styles.h3}> Additional summary data:</Text>
              <Text style={styles.listItem}>
                # of people with Prop 64 conviction in {formattedCountyName}{' '}
                County: {summaryData.subjectsWithProp64ConvictionCountInCounty}
              </Text>
              <Text style={styles.listItem}>
                # of Prop 64 convictions in {formattedCountyName} County:
                {totalProp64Convictions}
                {formatCountsByCodeSection(
                  summaryData.prop64ConvictionsCountInCountyByCodeSection
                )}
              </Text>
              <Text style={styles.listItem}>
                For the above convictions,{' '}
                {summaryData.prop64FelonyConvictionsCountInCounty} were felonies
                and {summaryData.prop64MisdemeanorConvictionsCountInCounty} were
                misdemeanors
              </Text>
            </View>
            <View>
              <Text style={styles.h3}>
                {formattedCountyName} County DAs eligibility determinations for
                felonies under Prop 64:
              </Text>
              <Text style={styles.text}>
                The following was the eligibility determination you chose when
                you ran the application:
              </Text>
              <Text style={styles.listItem}>
                For felonies, dismissals based on code section:
                {formatCountsByCodeSection(
                  summaryData.convictionDismissalCountByCodeSection
                )}
              </Text>
              <Text style={styles.listItem}>
                Reductions:{' '}
                {formatCountsByCodeSection(
                  summaryData.convictionReductionCountByCodeSection
                )}
              </Text>
              <Text style={styles.listItem}>
                Dismissals based on additional relief:{' '}
                {formatCountsByAdditionalRelief(
                  summaryData.convictionDismissalCountByAdditionalRelief
                )}
              </Text>
              <Text style={styles.listItem}>
                {summaryData.subjectsWithSomeReliefCount} individuals will get
                some type of relief
              </Text>
              <Text style={styles.text}>
                If the {formattedCountyName} DA’s office were to instead dismiss
                all convictions under Prop 64,{' '}
                {summaryData.reliefWithDismissAllProp64.CountSubjectsNoFelony}{' '}
                people will no longer have any felonies on their CA record,{' '}
                {
                  summaryData.reliefWithDismissAllProp64
                    .CountSubjectsNoConvictionLast7Years
                }{' '}
                people will no longer have any convictions on their CA record in
                the past 7 years, and{' '}
                {
                  summaryData.reliefWithDismissAllProp64
                    .CountSubjectsNoConviction
                }{' '}
                people will no longer have any convictions on their CA record at
                all.
              </Text>
            </View>
            <View style={styles.pageBreak} />
            <View>
              <Text style={styles.h2}>
                Understanding the Clear My Record output files:
              </Text>
              <Text style={styles.text}>
                The purpose of these output files is to show eligibility
                information for each Proposition 64 conviction and surface
                specific data most helpful for your office’s review.
              </Text>
              <Text style={styles.h3}>
                1. “Prop64_convictions_[timestamp].csv”
              </Text>
              <Text style={styles.text}>
                a . Since the DOJ file includes data from each individual&apos;s
                entire RAP Sheet, this spreadsheet condenses the data only to
                Prop 64 convictions in {formattedCountyName} County.
              </Text>
              <Text style={styles.text}>
                b. The first several columns (A through CQ) come straight from
                the original DOJ file. The remaining columns are generated by
                Code for America to surface more insights for DAs (the final two
                being the reduction or dismissal decision).
              </Text>
              <Text style={styles.h3}>2. “full_results_[timestamp].csv”</Text>
              <Text style={styles.text}>
                a. This spreadsheet is the entire DOJ file (columns A through
                CQ) plus all of the supporting information that Code for America
                generates.
              </Text>
              <Text style={styles.h3}>
                3. “condensed_results_[timestamp].csv”
              </Text>
              <Text style={styles.text}>
                a. This spreadsheet condenses some of the columns from the full
                results file to make it easier for DA’s offices to review the
                data on an individual’s entire CA criminal record history.
              </Text>
              <Text style={styles.text}>
                Note that the Clear My Record program only generates eligibility
                recommendations and insights based on the original data provided
                to your county by California DOJ. Review our FAQ for answers to
                common questions asked by DAs.
              </Text>
            </View>
            <View style={styles.pageBreak} />
            <View>
              <Text style={styles.h2}>Next Steps </Text>
              <Text style={styles.listItem}>
                Review Code for America’s Implementation Blueprint to learn more
                about our work helping several other counties implement H&S
                11361.9, including developing a plan with the courts
              </Text>
              <Text style={styles.listItem}>
                Share this summary report with Code for America at
                clearmyrecord@codeforamerica.org. Our team will send you back a
                marketing document with the above relevant summary statistics
                that your office can then share with the entire community in
                {formattedCountyName} County
              </Text>
              <Text style={styles.text}>
                Have more questions or have feedback for our team?
              </Text>
              <Text style={styles.text}>
                Email us at clearmyrecord@codeforamerica.org.
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
