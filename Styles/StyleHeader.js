import { StyleSheet, Dimensions} from 'react-native';
var screenWidth=Dimensions.get('window').width;
var screenHeight=Dimensions.get('window').height;
export const styles = StyleSheet.create({
  Header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'flex-end',
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
    marginBottom: 50,
    marginTop: 50,
    color: '#6D9AB0',
  
  },

  loadingView:{
    flex: 20, 
    alignItems: 'center',
  },
  DetectBox:{
    alignItems: 'center',
    width:300,
    borderWidth:3,
    flex:1,
    width: screenWidth
  },
  bodyContent: {
    borderWidth:3,
    borderColor: '#FF0000', 
  },
  SensorListHeader:{
    top:0,
    flex:.2,
    borderWidth:1,
    width:'100%',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  SensorListHeaderText:{
    fontSize: 30, 
    fontFamily: 'Montserrat_300Light',
    color: '#6D9AB0',
  },
  SensorList:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor: '#93B3C8',
  },
  sensor:{
    marginBottom: 5,
    marginTop: 5,
    alignItems:'center',
    justifyContent:'center',
    width:'70%',
    height:50,
    backgroundColor: '#6D9AB0',
  },
  sensorText:{
    fontFamily: 'Montserrat_300Light', 
    fontSize:20,
  },
  sensorRename:{
    marginBottom: 10,
    alignItems:'center',
    justifyContent:'center',
    width:'70%',
    height:50,
    backgroundColor:"#F2F6F8",
    borderWidth:1,
    borderColor: "#93B3C8",
  },
  sensorRenameText:{
    height: '100%',
    width:'100%',
    margin: 12,
    padding: 10,
  },
  sensorListContainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    flex:.8,

  },
  NextButton:{
    width:screenWidth,
    borderWidth: 3,
    alignItems:'flex-end', 
    justifyContent:'flex-end',
    paddingRight: 10,
  },
  addButtonContainer:{
    flex:.2,
    borderWidth:3,
    justifyContent:'center',
    alignItems:'center',

  },
  addButton:{
    backgroundColor:'#93B3C8',
    width:'30%',
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
  },
  drawRoomContainer:{
    flex:.8,
    borderWidth:3,
    borderColor:'#FF0000',
    width: screenWidth,
  },
  RoomListContainer:{
    borderWidth:3,
    borderColor:'green',
    flexDirection: 'column',
    
  },
  roomName:{
    marginBottom: 10,
    alignItems:'center',
    justifyContent:'center',
    width: 250,
    height:40,
    backgroundColor:"white",
    borderWidth:1,
    borderColor: "#93B3C8",
    borderRadius:5,
  },
  roomNameText:{
    height: '100%',
    width:'100%',
    margin: 12,
    padding: 10,
  },
  applyButton:{
    backgroundColor:'#93B3C8',
    width:'25%',
    height:40,
    marginHorizontal: 5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4,
  },
  AlertScreenContainer:{
    flex:1,
    borderWidth:5, 
    borderColor: 'yellow',
    justifyContent: 'center'
  },

  Alert:{ 
    flex: 0.8, 
    flexDirection: 'column',
    borderWidth:3, 
    borderColor: 'red', 
    width: screenWidth,
    alignItems: 'flex-start'
  },
  checkboxBase: {
    marginTop: 5,
    marginLeft: 5,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#93B3C8',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#007D08',
  },
  weatherContainer:{
    marginTop:5,
    marginLeft: 13,
    backgroundColor:'#E6EEF3',
    width: screenWidth*0.92,
    borderRadius: 6,
    paddingBottom: 5,
  },
  selectionText:{
    fontSize: 15,
    fontFamily: 'Montserrat_500Medium',
    color: '#3E3E3E',
    marginLeft:5,
    marginTop:5,
    marginRight:6,
  }
});