import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

const VideoPreview = ({url, show, onClose}) => {
  const videoRef = React.useRef(null);

  return (
    <Modal backdropColor="black" backdropOpacity={1} isVisible={show}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon style={styles.closeIcon} name="close" size={32} color="black" />
      </TouchableOpacity>
      <Video
        source={{uri: url}}
        ref={videoRef}
        controls
        fullscreenAutorotate
        fullscreenOrientation={'landscape'}
        style={styles.backgroundVideo}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    zIndex: 2,
    right: 16,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 40,
    width: 40,
    top: 36,
  },
  closeIcon: {
    marginLeft: 4,
    marginTop: 4,
  },
});

export default VideoPreview;
