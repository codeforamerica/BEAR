import { StyleSheet } from '@react-pdf/renderer';
// import robotoBold from '../assets/fonts/Roboto-Bold.ttf';
// import robotoRegular from '../assets/fonts/Roboto-Regular.ttf';
//
// Font.register({
//   family: 'Roboto-Bold',
//   src: robotoBold
// });
//
// Font.register({
//   family: 'Roboto',
//   src: robotoRegular
// });

const baseTextStyles = {
  fontSize: 12,
  lineHeight: 1.5
  // fontFamily: 'Roboto'
};

const baseHxStyles = {
  color: '#008060',
  fontWeight: 'bold'
};

const styles = StyleSheet.create({
  page: {
    paddingBottom: 20,
    paddingTop: 30
  },
  logoImage: {
    position: 'absolute',
    top: 0,
    left: 35,
    width: 200
  },
  bulletImage: {
    position: 'absolute',
    height: 6,
    marginRight: 20
  },
  headerText: {
    width: 300,
    position: 'absolute',
    right: 35,
    bottom: 10
  },
  tinyText: {
    fontSize: 8,
    marginVertical: 3,
    textAlign: 'right'
  },
  header: {
    borderBottom: 7,
    borderColor: '#008060',
    marginTop: -20,
    marginBottom: 20,
    position: 'relative',
    height: 100
  },
  body: {
    paddingTop: 15,
    paddingHorizontal: 35,
    paddingRight: 65
  },
  textWithPadding: {
    ...baseTextStyles,
    paddingTop: 8
  },
  h1: {
    marginBottom: 10,
    fontSize: 24
    // fontFamily: 'Roboto-Bold'
  },
  h2: {
    ...baseHxStyles,
    marginTop: 18,
    marginBottom: 12,
    fontSize: 14
  },
  h3: {
    ...baseHxStyles,
    marginTop: 16,
    marginBottom: 10,
    fontSize: 12
  },
  h3Condensed: {
    ...baseHxStyles,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 10
  },
  text: {
    ...baseTextStyles
  },
  indentedText: {
    ...baseTextStyles,
    marginLeft: 16,
    marginBottom: 10
  },
  boldText: {
    ...baseTextStyles
    // fontFamily: 'Roboto-Bold'
  },
  listItem: {
    ...baseTextStyles,
    marginBottom: 8,
    paddingLeft: 15
  },
  horizontalRule: {
    borderBottom: 1,
    borderColor: '#008060',
    marginHorizontal: 130,
    marginTop: 12
  }
});

export default styles;
