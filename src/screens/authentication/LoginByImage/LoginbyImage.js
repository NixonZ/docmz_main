
import React, { Fragment, Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
//import Socket from './Socket.js'
//import { PRIMARY, SECONDARY, BLACK } from './src/styles/colors';
//import API from './API.js'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};



export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
      fileData: '',
      fileUri: ''
    }
  }
  state = {
    photo: null,
  }
  componentDidMount (){
    this.socket = io("http://192.168.137.1:5000");
  }

  componentDidMount() {
    // this.launchCamera();
   }

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }
  
 

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
           photo: response 
        });
      }
    });

  }
  

  

  handleUploadPhoto = () => {
    fetch("http://192.168.137.1:5000", {
      method: "POST",
      body: createFormData(this.state.photo, { userId: "123" })
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  renderFileData() {
    if (this.state.fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('./images/img5.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./images/img6.png')}
        style={styles.images}
      />
    }
  }
  render() {
    const { photo } = this.state
    return (
      <View style={styles.body}>
        <Text style={styles.text1}>Face Id Unlock</Text>
        <View  style={styles.body1}>
        
        {photo && (
        <React.Fragment>
        <Image
          source={{ uri: photo.uri }}
          style={styles.image}
        />

        <TouchableOpacity
              style={styles.loginButton}
              onPress={this.handleUploadPhoto}>
              <Text style={{ color:'#F7C033',textAlign:'center'}}>Login</Text>
            </TouchableOpacity>
        </React.Fragment>
        )}
        </View>
         <View style={styles.body2}>
        <TouchableOpacity
              style={styles.button}
              onPress={this.launchCamera}>
              <Text style={{ color:'#F7C033',textAlign:'center'}}>Directly launch camera</Text>
            </TouchableOpacity>
           
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleChoosePhoto}>
              <Text style={{ color:'#F7C033',textAlign:'center'}}>Choose Photo</Text>
            </TouchableOpacity>
      </View>
      </View>
     
    );
  }
};

const styles = StyleSheet.create({
  body:{
    flex: 1,
    backgroundColor: '#F2F5FF',
    
  },
  body1:{
    flex: 1,
    backgroundColor: '#F2F5FF',
    
  },
  body2:{
    flex: 0.33,
    backgroundColor: '#F2F5FF',
    
  },
  text1:{
    fontWeight: 'bold',
    fontSize: 40,
    fontFamily:'OpenSans-Regular',
    marginTop:20,
    textAlign:'center'
  },
  button:{
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#F7C033',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  loginButton:{
    marginTop:60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#F7C033',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  ImageSections:{
    marginLeft:50
  },
  image:{
    marginTop:40,
    width:200,
    height:300,
    marginLeft:98
  }

 
})