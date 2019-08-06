import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  bigHeader: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: 'blue'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: 'purple'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
    color: 'green'
  },
  subtitle: {
    fontSize: 18,
    margin: 12
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  }
});

export default styles;
