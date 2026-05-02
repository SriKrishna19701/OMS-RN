import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import API from '../../services/api';

const applyScreen = () => {
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApply = async () => {
        try {
            await API.post('/outpass/apply', { reason, fromDate, toDate });
            navigation.goBack();
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit request');
        }
    };
};
return (
    <View style={styles.container}>
        <Text style={styles.title}>Apply for Outpass</Text>
        <TextInput
            style={styles.input}
            placeholder="Reason for Outpass"
            value={reason}
            onChangeText={setReason}
        />
        <TextInput
            style={styles.input}
            placeholder="From Date (YYYY-MM-DD)"
            value={fromDate}
            onChangeText={setFromDate}
        />
        <TextInput
            style={styles.input}
            placeholder="To Date (YYYY-MM-DD)"
            value={toDate}
            onChangeText={setToDate}
        />
        <Button title="Submit" onPress={handleApply} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});

export default applyScreen;