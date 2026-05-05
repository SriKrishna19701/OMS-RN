import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import API from '../../services/api';

const HomeScreen = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await API.get('/api/admin/requests');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            Alert.alert('Error', 'Failed to load requests');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const approve = async (id) => {
        try {
            await API.put(`/api/admin/requests/${id}/approve`);
            setRequests(requests.filter(req => req._id !== id));
        } catch (error) {
            console.error('Error approving request:', error);
            Alert.alert('Error', 'Failed to approve request');
        }
    };

    const reject = async (id) => {
        try {
            await API.put(`/api/admin/requests/${id}/reject`);
            setRequests(requests.filter(req => req._id !== id));
        } catch (error) {
            console.error('Error rejecting request:', error);
            Alert.alert('Error', 'Failed to reject request');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={{width: 40}} />
                <Text style={styles.headerBrand}>OMS</Text>
                <View style={styles.avatarPlaceholder}><Text style={{fontSize: 14, color: '#4B6396', fontWeight: 'bold'}}>A</Text></View>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Pending Requests</Text>
                <Text style={styles.subtitle}>Review and manage student outpass permissions.</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statSquare}>

                        <Text style={styles.statLabel}>QUEUE</Text>
                        <Text style={styles.statValue}>{requests.length}</Text>
                    </View>
                    <View style={[styles.statSquare, { backgroundColor: '#E9D5FF' }]}>

                        <Text style={styles.statLabel}>ACCOUNTS</Text>
                        <Text style={styles.statValue}>12</Text>
                    </View>
                </View>

                <FlatList
                    data={requests}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    renderItem={({ item }) => (
                        <View style={styles.requestCard}>
                            <View style={styles.cardHeader}>
                                <View style={styles.userAvatar}><Text style={{color: '#4B6396', fontWeight: 'bold'}}>S</Text></View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{item.reason || 'Student Request'}</Text>
                                    <Text style={styles.userMeta}>ID: ...{item._id?.substring?.(item._id.length - 4)}</Text>
                                </View>
                            </View>
                            
                            <View style={styles.detailsRow}>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>PURPOSE</Text>
                                    <Text style={styles.detailValue}>{item.reason}</Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>TIMEFRAME</Text>
                                    <Text style={styles.detailValue}>
                                        {new Date(item.fromDate).toLocaleDateString()} - {new Date(item.toDate).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.rejectBtn} onPress={() => reject(item._id)}>
                                    <Text style={styles.rejectBtnText}>Reject</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.approveBtn} onPress={() => approve(item._id)}>
                                    <Text style={styles.approveBtnText}>Approve</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyQueue}>

                            <Text style={styles.emptyQueueText}>You've reached the end of the queue for now.</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FE' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
    menuIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
    headerBrand: { fontSize: 20, fontWeight: '700', color: '#4B6396' },
    avatarPlaceholder: { width: 32, height: 32, backgroundColor: '#E2E8F0', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    container: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
    title: { fontSize: 28, fontWeight: '700', color: '#2D3748', marginBottom: 4 },
    subtitle: { fontSize: 14, color: '#718096', marginBottom: 24 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    statSquare: { flex: 1, backgroundColor: '#F1F3F9', borderRadius: 16, padding: 16, marginRight: 12 },
    statIcon: { marginBottom: 12 },
    statLabel: { fontSize: 10, fontWeight: '700', color: '#718096', letterSpacing: 1, marginBottom: 4 },
    statValue: { fontSize: 24, fontWeight: '700', color: '#2D3748' },
    requestCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16, shadowColor: '#435585', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    userAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F3F9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    userInfo: { flex: 1 },
    userName: { fontSize: 16, fontWeight: '700', color: '#2D3748', marginBottom: 2 },
    userMeta: { fontSize: 12, color: '#718096' },
    detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    detailBox: { flex: 1, paddingRight: 8 },
    detailLabel: { fontSize: 10, fontWeight: '700', color: '#4B6396', letterSpacing: 1, marginBottom: 4 },
    detailValue: { fontSize: 14, color: '#4A5568', fontWeight: '500' },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    rejectBtn: { flex: 1, backgroundColor: '#F1F3F9', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    rejectBtnText: { color: '#4A5568', fontWeight: '600', fontSize: 15 },
    approveBtn: { flex: 1, backgroundColor: '#4B6396', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
    approveBtnText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
    emptyQueue: { backgroundColor: '#F1F3F9', borderRadius: 24, padding: 40, alignItems: 'center', marginTop: 20 },
    emptyQueueIcon: { fontSize: 30, color: '#A0ABC0', marginBottom: 16 },
    emptyQueueText: { fontSize: 14, color: '#718096', textAlign: 'center' }
});

export default HomeScreen;