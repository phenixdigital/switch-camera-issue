import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import _ from 'lodash'

export default class App extends React.Component {

  state = {
    type: 'back',
    isRecording: false
  }

  toggleCam () {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back'
    })
  }

  pressRecordButton = () => {
    this.state.isRecording ? this.stopRecording() : this.takeVideo()
  }

  takeVideo = async () => {

    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          console.warn('takeVideo', data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  stopRecording = () => {
    this.camera.stopRecording()
  }

  renderCamera () {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref
        }}
        style={styles.camera}
        type={this.state.type}
      />
    )
  }

  renderActionButtons () {
    return (
      <TouchableOpacity onPress={this.toggleCam.bind(this)} style={styles.actionsContainer}>
        <Text>Toggle Cam</Text>
      </TouchableOpacity>
    )
  }

  renderRecordButton () {
    return (
      <TouchableOpacity onPress={this.pressRecordButton.bind(this)} style={styles.recordContainer}>
        <Text>Record</Text>
      </TouchableOpacity>
    )
  }

  renderRecordingStatus () {
    if (this.state.isRecording) {
      return (
        <View style={styles.recordingStatus}></View>
      )
    } else {
      return
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {this.renderCamera()}
        {this.renderActionButtons()}
        {this.renderRecordButton()}
        {this.renderRecordingStatus()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  camera: {
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    bottom: 0
  },

  actionsContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10
  },

  recordContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'red',
    padding: 10
  },

  recordingStatus: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 50
  }
});
