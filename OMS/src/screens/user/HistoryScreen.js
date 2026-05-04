import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
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

    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'approved': return { bg: '#E6F4EA', text: '#1E4620' };
            case 'rejected': return { bg: '#FCE8E6', text: '#A50E0E' };
            default: return { bg: '#F1F3F9', text: '#4B6396' }; // pending
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <View style={styles.menuIcon}><Text style={{fontSize:20, color:'#4B6396'}}>≡</Text></View>
              <Text style={styles.headerBrand}>PassFlow</Text>
              <View style={styles.avatarPlaceholder}><Text style={{fontSize: 14}}>👤</Text></View>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Outpass History</Text>
                <Text style={styles.subtitle}>Review your past and current mobility requests.</Text>
                
                <FlatList
                    data={requests}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => {
                        const statusColor = getStatusColor(item.status);
                        return (
                            <View style={styles.requestCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.iconBox}><Text>📍</Text></View>
                                    <View style={styles.reasonContainer}>
                                        <Text style={styles.reasonText}>{item.reason}</Text>
                                        <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                                            <Text style={[styles.statusText, { color: statusColor.text }]}>{item.status}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.dateRow}>
                                    <Text style={styles.dateLabel}>Departure</Text>
                                    <Text style={styles.dateValue}>{new Date(item.fromDate).toLocaleDateString()}</Text>
                                </View>
                                <View style={styles.dateRow}>
                                    <Text style={styles.dateLabel}>Return</Text>
                                    <Text style={styles.dateValue}>{new Date(item.toDate).toLocaleDateString()}</Text>
                                </View>
                            </View>
                        );
                    }}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>You haven't made any requests yet.</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    menuIcon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerBrand: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4B6396',
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        backgroundColor: '#E2E8F0',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2D3748',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 24,
    },
    requestCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#435585',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#F1F3F9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    reasonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reasonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
        flexShrink: 1,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F1F3F9',
    },
    dateLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A5568',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    emptyText: {
        fontSize: 14,
        color: '#A0ABC0',
    }
});

export default HistoryScreen;