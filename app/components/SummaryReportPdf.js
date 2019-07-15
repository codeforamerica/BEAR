import React, { Component } from 'react';
import { Text, Page, Document } from '@react-pdf/renderer';

type Props = {
  county: string,
  dateTime: string
};

export default class SummaryReportPdf extends Component<Props> {
  render() {
    const { county, dateTime } = this.props;
    return (
      <Document>
        <Page>
          <Text>
            ~ Created with react-pdf ~
          </Text>
          <Text>Created at {dateTime} for {county}</Text>
          <Text render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed/>
        </Page>
      </Document>
    );
  }
}



