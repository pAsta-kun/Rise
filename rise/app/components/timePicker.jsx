import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RegularText from './text/regularText';

function TimePicker({text, marginL}) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
  
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginLeft: marginL
        },
        timePicker:{
          justifyContent: 'center',
          alignItems: 'center',
      },
    });
  
    return (
      <View style={styles.container}>
        <RegularText text={text} size={24}/>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={onChange}
            themeVariant="dark"
            style={styles.timePicker}
          />
      </View>
    );
}

export default TimePicker;