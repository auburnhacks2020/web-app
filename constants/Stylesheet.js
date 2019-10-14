const heading = "roboto-mono-bold";
const text = "montserrat";
const robotoMono = "roboto-mono";

export default {
  container: {
    flex: 1,
    backgroundColor: "#03244d"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: "90%",
    backgroundColor: "#f8f8f8",
    padding: 20,
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 40,
  },
  par: {
    fontFamily: text,
    fontSize: 17,
    paddingTop: 10,
  },
  btn: {
      backgroundColor: '#03244d'
  },
  cardbtn: {
    backgroundColor: '#03244d',
    alignSelf: 'flex-end',
  },
  cardAction: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContent: {
    paddingTop: 10
  },
  robotoMono,
  heading,
  text
};
