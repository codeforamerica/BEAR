import { StyleSheet } from '@react-pdf/renderer';

// Font.register({
//   family: 'Roboto',
//   src: path.join(__dirname, '/assets/fonts/Roboto-Medium.ttf')
// });
// Font.register({
//   family: 'Roboto-Bold',
//   src: path.join(__dirname, '/assets/fonts/Roboto-Bold.ttf')
// });

const styles = StyleSheet.create({
  logoImage: {
    position: 'absolute',
    top: 0,
    left: 35,
    width: 200
  },
  bulletImage: {
    position: 'absolute'
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
    marginVertical: 20,
    position: 'relative',
    height: 100
  },
  body: {
    paddingTop: 15,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  textWithPadding: {
    paddingTop: 8
  },
  h1: {
    marginBottom: 8,
    fontSize: 24
    // fontFamily: 'Roboto-Bold'
  },
  h2: {
    marginTop: 16,
    marginBottom: 12,
    color: '#008060',
    fontSize: 14
    // fontFamily: 'Roboto-Bold'
  },
  h3: {
    marginVertical: 10,
    color: '#008060',
    fontSize: 12
    // fontFamily: 'Roboto-Bold'
  },
  text: {
    fontSize: 12
  },
  boldText: {
    fontSize: 12
    // fontFamily: 'Roboto-Bold'
  },
  listItem: {
    fontSize: 12,
    paddingVertical: 8,
    paddingLeft: 15
  },
  pageBreak: {
    borderBottom: 1,
    borderColor: '#008060',
    marginHorizontal: 130,
    marginTop: 8
  }
});

export default styles;
