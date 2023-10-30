import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import NfcManager, { Ndef } from 'react-native-nfc-manager';

const App = () => {
  const [tag, setTag] = useState(null);

  useEffect(() => {
    initNFC();
    return () => {
      NfcManager.stop();
    };
  }, []);

  const initNFC = async () => {
    try {
      await NfcManager.start();
      NfcManager.setEventListener(NfcTech.Ndef, handleNdef);
    } catch (error) {
      console.error('Error initializing NFC:', error);
    }
  };

  const handleNdef = async (tag) => {
    setTag(tag);
    console.log('NFC Tag:', tag);
    // Do something with the NFC data, e.g., read NDEF messages
    const ndefMessage = await Ndef.readNdefMessage(tag);
    console.log('NDEF Message:', ndefMessage);
  };

  const startNFC = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
    } catch (error) {
      console.error('Error starting NFC:', error);
    }
  };

  return (
    <View>
      <Text>NFC Tag: {tag ? 'Connected' : 'Not Connected'}</Text>
      <Button title="Start NFC" onPress={startNFC} />
    </View>
  );
};

export default App;