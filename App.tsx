import { Text, StyleSheet, View, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';
import React, { Component } from 'react';
import Tts from 'react-native-tts';
import { Dimensions } from 'react-native';

const {width,height}=Dimensions.get('window')

export default class index extends Component {
  state = {
    number: 0
  }


  count = () => {
    this.setState({
      number: ++this.state.number,
    });
  };

  reset = () => {
    if (this.state.number > 0) {
      Alert.alert(
        "Sıfırlama Onayı",
        "Sayacı sıfırlamak istediğinizden emin misiniz?",
        [
          {
            text: "İptal",
            onPress: () => console.log("Sıfırlama iptal edildi"),
            style: "cancel"
          },
          { text: "Evet", onPress: () => this.setState({ number: 0 }) }
        ]
      );
    }
    else {
      return;
    }
  };

  componentDidMount() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('tr-TR'); // Türkçe dili ayarla
      Tts.setDefaultRate(0.5); // Konuşma hızını düşür
      Tts.setDefaultPitch(0.8); // Ses tonunu biraz yükselt
    });
  }

  speakNumber = () => {
    Tts.speak(this.state.number.toString());
  };

  render() {
    return (
      
      <ImageBackground source={require('./assets/backgroundImage.png')} style={[styles.container]} >
        <View style={styles.textState}>
    <Text style={{ fontSize: 96,color:'white',fontFamily:'digital-7',paddingBottom:30}}>{this.state.number}</Text>
        </View>

        <View style={styles.buttonsState}>
          <TouchableOpacity onPress={this.count} style={[styles.buttons1]}>
            
          </TouchableOpacity>
        </View>
        <View style={styles.buttonState2}>
          <TouchableOpacity onPress={this.reset} style={styles.buttons2}>
            <Text style={{ fontSize:24,color:'white',fontFamily:'caveat'}}>Sıfırla</Text>
            
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress={this.speakNumber} style={[styles.buttons2,{backgroundColor:'#028482'}] }>
            <Image style={styles.imageSound} source={require('./src/components/volume.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons2}>
            <Text style={{ fontSize: 18 }}></Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:height,
    width: width,
    top: 0,
    left: 0,
  },
  textState: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
   
    
  },
  buttonsState: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    

    
  },
  buttonState2: {
    
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal:width*0.06,
   
    marginTop:20
  },
  buttons1: {
    width: width * 0.36, // Ekran genişliğinin %40'ı
    height: width * 0.36, // Ekran genişliğinin %40'ı
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.2, // Yarıçapı genişliğin yarısı yap
    marginTop: width * 0.03,
    backgroundColor:'#028482'
    
  },
  
  buttons2: {
    width: width * 0.15, // Ekran genişliğinin %15'i
    height: width * 0.15, // Ekran genişliğinin %15'i
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.075, // Yarıçapı genişliğin yarısı yap
    backgroundColor:'#028482'
    
  },
  imageSound:{
   
    marginBottom:width*0.02,
    width:'70%',
    height:'70%',
    resizeMode:'contain'
   
  }

});