import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import API from '../../services/api';

const HomeScreen = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await API.get('/api/admin/requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            alert('Failed to load requests');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const approve = async (id) => {
        try {
            await API.put(`/api/admin/requests/${id}/approve`);
            setRequests(requests.filter(req => req._id !== id));
            fetchRequests();
        } catch (error) {
            console.error('Error approving request:', error);
            alert('Failed to approve request');
        }
    };

    const reject = async (id) => {
        try {
            await API.put(`/api/admin/requests/${id}/reject`);
            setRequests(requests.filter(req => req._id !== id));
            fetchRequests();
        } catch (error) {
            console.error('Error rejecting request:', error);
            alert('Failed to reject request');
        }
    }   ;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pending Outpass Requests</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.requestItem}>
                        <Text>{item.reason}</Text>
                        <View style={styles.buttons}>
                            <Button title="Approve" onPress={() => approve(item._id)} />
                            <Button title="Reject" onPress={() => reject(item._id)} />
                        </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default HomeScreen;