import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../../services/api';

const ApplyScreen = () => {
    const navigation = useNavigation();
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApply = async () => {
        try {
            await API.post('/api/user/apply', { reason, fromDate, toDate });
            Alert.alert('Success', 'Outpass request submitted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error submitting request:', error);
            Alert.alert('Failed', error.response?.data?.message || 'Failed to submit request');
        }
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
};

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

export default ApplyScreen;