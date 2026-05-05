import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/api';

const HomeScreen = ({ navigation }) => {
    const [requests, setRequests] = useState([]);
    const { user } = useContext(AuthContext);

    const fetchRequests = async () => {
        try {
            const response = await API.get('/api/user/outpass');
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear();
    const monthlyCount = requests.filter(req => {
        const reqDate = new Date(req.createdAt || req.fromDate);
        return reqDate.getMonth() + 1 === currentMonth && reqDate.getFullYear() === currentYear;
    });
   
    const usedPasses = monthlyCount.length;
    const activeRequest = requests.find(req => req.status === 'approved' && new Date(req.toDate) >= new Date());

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={styles.menuIcon}><Text style={{fontSize:20, color:'#4B6396'}}>≡</Text></View>
                    <Text style={styles.headerBrand}>OMS</Text>
                    <View style={styles.avatarPlaceholder}><Text style={{fontSize: 14, color: '#4B6396', fontWeight: 'bold'}}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text></View>
                </View>

                <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'Student'}</Text>
                <Text style={styles.subtitle}>Your campus transit overview is ready.</Text>

                <View style={styles.usageCard}>
                    <Text style={styles.usageLabel}>USAGE SUMMARY</Text>
                    <View style={styles.usageStatRow}>
                        <Text style={styles.usageBig}>{usedPasses}</Text>
                        <Text style={styles.usageSmall}> / 3</Text>
                    </View>
                    <Text style={styles.usageText}>passes used this month</Text>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${Math.min((usedPasses/3)*100, 100)}%` }]} />
                    </View>
                </View>

                <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.navigate("Apply") || navigation.navigate("ApplyScreen")}>
                    <Text style={styles.applyBtnText}>Apply for New Pass</Text>
                    <Text style={{color: '#FFF'}}>→</Text>
                </TouchableOpacity>

                {activeRequest && (
                    <View style={styles.activeCard}>
                        <View style={styles.activeHeader}>
                            <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>ACTIVE OUTPASS</Text></View>

                        </View>
                        <Text style={styles.activeTitle}>{activeRequest.reason}</Text>
                        
                        <View style={styles.activeDatesRow}>
                            <View>
                                <Text style={styles.activeDateLabel}>DEPARTURE</Text>
                                <Text style={styles.activeDateVal}>{new Date(activeRequest.fromDate).toLocaleDateString()}</Text>
                            </View>
                            <View>
                                <Text style={styles.activeDateLabel}>RETURN</Text>
                                <Text style={styles.activeDateVal}>{new Date(activeRequest.toDate).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.qrContainer}>
                            <Text style={styles.qrInstructions}>Present this QR code at the main security gate for digital verification.</Text>
                            <View style={styles.qrBox}><Text style={{fontSize: 16, color: '#A0ABC0', fontWeight: 'bold'}}>QR</Text></View>
                        </View>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Recent Destinations</Text>
                {requests.length === 0 ? (
                    <Text style={styles.noHistory}>No recent requests found.</Text>
                ) : (
                    requests.slice(0, 3).map((req, idx) => (
                        <View key={idx} style={styles.recentItem}>
                            <View style={styles.recentIcon} />
                            <View style={{flex: 1}}>
                                <Text style={styles.recentReason}>{req.reason}</Text>
                                <Text style={styles.recentDate}>Requested for: {new Date(req.fromDate).toLocaleDateString()}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FE' },
    container: { padding: 24, paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, paddingTop: 16 },
    headerBrand: { fontSize: 20, fontWeight: '700', color: '#4B6396' },
    avatarPlaceholder: { width: 32, height: 32, backgroundColor: '#E2E8F0', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    greeting: { fontSize: 32, fontWeight: '700', color: '#2D3748', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#718096', marginBottom: 32 },
    usageCard: { backgroundColor: '#F1F3F9', borderRadius: 24, padding: 24, marginBottom: 16 },
    usageLabel: { fontSize: 11, fontWeight: '700', color: '#718096', letterSpacing: 1.5, marginBottom: 12 },
    usageStatRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
    usageBig: { fontSize: 48, fontWeight: '800', color: '#4B6396' },
    usageSmall: { fontSize: 20, fontWeight: '600', color: '#718096', marginLeft: 4 },
    usageText: { fontSize: 14, color: '#718096', marginBottom: 16 },
    progressBarBg: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4 },
    progressBarFill: { height: 8, backgroundColor: '#4B6396', borderRadius: 4 },
    applyBtn: { backgroundColor: '#4B6396', borderRadius: 16, flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 18, justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    applyBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    activeCard: { backgroundColor: '#4B6396', borderRadius: 24, padding: 24, marginBottom: 32 },
    activeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    activeBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    activeBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
    activeTitle: { fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 24 },
    activeDatesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    activeDateLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
    activeDateVal: { fontSize: 16, color: '#FFF', fontWeight: '500' },
    qrContainer: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, alignItems: 'center' },
    qrInstructions: { fontSize: 12, color: '#718096', textAlign: 'center', marginBottom: 16 },
    qrBox: { padding: 10, backgroundColor: '#F8F9FE', borderRadius: 8 },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#2D3748', marginBottom: 16 },
    recentItem: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center' },
    recentIcon: { width: 40, height: 40, backgroundColor: '#F1F3F9', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    recentReason: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginBottom: 4 },
    recentDate: { fontSize: 13, color: '#718096' },
    noHistory: { fontSize: 15, color: '#A0ABC0', fontStyle: 'italic', marginTop: 8 }
});

export default HomeScreen;