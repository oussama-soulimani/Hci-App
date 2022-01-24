import { StyleSheet, Dimensions} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
export const screenWidth=Dimensions.get('window').width;
export const screenHeight=Dimensions.get('window').height;

export const styles = StyleSheet.create({
  
  Header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'flex-end',
    backgroundColor: "#93B3C8",
    flex:1.2,
  },
  HeaderText: {
    fontFamily:'Montserrat_300Light',
    fontSize:33,  
    marginBottom: 2,
    color: "#F2F6F8" 
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
    flex:1,
    width: screenWidth
  },
  bodyContent: {
 
  },
  SensorListHeader:{
    top:0,
    flex:.2,
    width:'100%',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  Bigtext:{
    fontSize: 30, 
    fontFamily: 'Montserrat_300Light',
    color: '#6D9AB0',
  },
  SensorList:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    borderColor: '#93B3C8',
  },
  sensor:{
    marginBottom: 5,
    marginTop: 5,
    alignItems:'center',
    justifyContent:'center',
    width:'70%',
    height:50,
    borderWidth:2,
    borderColor:"#6D9AB0",
    borderRadius:5
  },
  sensorText:{
    fontFamily: 'Montserrat_300Light', 
    fontSize:25,
    color:"#6D9AB0"
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
    alignItems:'flex-end', 
    justifyContent:'flex-end',
    paddingRight: 10,
  },
  addButtonContainer:{
    flex:.2,
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
   /**
   * 2x+355 = height
   * x = height-355/2
   */
  drawroompopup:{
    paddingTop:(screenHeight-355)/2,
    height:355+(screenHeight-355)/2,
    justifyContent:'center', 
    alignItems:'center', 
  },

 
  drawRoomContainer:{
    flex:.8,
    width: screenWidth,
  },
  RoomListContainer:{
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
  },

  Alert:{ 
    flex: 0.8, 
    flexDirection: 'column',
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
  },
  roomImage:{
    width: screenWidth*0.40, 
    height:screenWidth*0.35, 
  },
  roomImageContainer:{
    width: screenWidth*0.40,
    borderWidth:3,
    borderRadius:6,
    borderColor:'#E5EDF0', 
    backgroundColor:"#E5EDF0",
    alignItems:'center',
    marginVertical:10,
  },
  roomsContainer:{
   
    flexDirection:'row',
    width:screenWidth,
    justifyContent:'space-evenly',
    flexWrap:'wrap',
    

  },
  roomdrawingName:{
    fontFamily:'Montserrat_300Light',
    color:'#6D9AB0',
    fontSize:20,
    marginRight:5
  },
  LastElement:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:0,

  },
  RoomScreenRoom:{
    width: screenWidth-10, 
    flex:1,
    borderWidth:0.1
  },
  RoomScreenContainer:{
    flex:0.5,
  },
  RoomScreenText:{
    backgroundColor:"#E5EDF0", 
    width: screenWidth,
    alignItems:'center',
    justifyContent:'center',
    flex:0.3,
  },
  SettingBox:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#E5EDF0',
    borderWidth:1,
    borderColor:'#93B3C8',
    borderRadius:8,
    width:screenWidth*0.6,
    height:60,
    margin:6,
  },
  SettingsText:{
    fontFamily:'Montserrat_300Light',
    color:'#6D9AB0',
  },
  BackButtonContainer:{
    marginRight:5,
    marginBottom:3, 
    flex:0.5, 
    flexDirection:'row', 
    paddingLeft:10,
    alignItems:'flex-end',
    width:screenWidth,
  },
  DeleteScreenBack:{
    marginRight:5,
    marginBottom:3, 
    flex:0.15, 
    flexDirection:'row', 
    paddingLeft:10,
    alignItems:'flex-end',
    width:screenWidth,
  },
  DeleteButton:{
    borderWidth:1,
    width:ScreenWidth*0.4,
    margin:3,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:55,
    borderColor:'#93B3C8',
    backgroundColor:'#E5EDF0',
    borderRadius:4,
  },
  SettingsTextPressed:{
    fontFamily:'Montserrat_300Light',
    color:'#C20000',
  },
  DeleteButtonPressed:{
    borderWidth:1,
    width:ScreenWidth*0.4,
    margin:3,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:55,
    borderColor:'#93B3C8',
    backgroundColor:'#FCEEEE',
    borderRadius:4,
  },

});
