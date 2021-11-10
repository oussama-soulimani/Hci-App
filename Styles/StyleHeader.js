import { StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: "#93B3C8",
    flex:1,
  },

  Body: {
    backgroundColor: "#F2F6F8",
    flex:10,
    alignItems: 'center',
    top: 0,

  },
  
  BodyLoadingText:{
    fontSize: 30, 
    fontFamily: 'Montserrat_300Light', 
    marginTop: 50,
    color: '#6D9AB0',
  
  },

  loadingView:{
    flex: 20, 
    justifyContent: 'center',
    alignItems: 'center',

  },
  
});