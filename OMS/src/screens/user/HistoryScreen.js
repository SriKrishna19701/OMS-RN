import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import API from '../../services/api';

const HistoryScreen = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await API.get('/api/user/outpass');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Failed to load requests');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Outpass Requests</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.requestItem}>
                        <Text>Reason: {item.reason}</Text>
                        <Text>From: {new Date(item.fromDate).toLocaleDateString()}</Text>
                        <Text>To: {new Date(item.toDate).toLocaleDateString()}</Text>
                        <Text>Status: {item.status}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    requestItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default HistoryScreen;