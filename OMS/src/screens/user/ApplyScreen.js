import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const ApplyScreen = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [reason, setReason] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleApply = async () => {
        try {
            await API.post('/api/user/outpass', { reason, fromDate, toDate });
            Alert.alert('Success', 'Outpass request submitted successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error submitting request:', error);
            Alert.alert('Failed', error.response?.data?.message || 'Failed to submit request');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backIconText}>←</Text>
                        </TouchableOpacity>
                        <View style={styles.avatarPlaceholder}><Text style={{fontSize: 14, color: '#4B6396', fontWeight: 'bold'}}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text></View>
                    </View>

                    <Text style={styles.eyebrow}>DIGITAL CONCIERGE</Text>
                    <Text style={styles.title}>Request Outpass</Text>
                    <Text style={styles.subtitle}>Secure your mobility with precision. Fill in your travel details to initiate the institutional approval workflow.</Text>

                    <View style={styles.card}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Reason for Visit</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Purpose of your outpass"
                                    placeholderTextColor="#A0ABC0"
                                    value={reason}
                                    onChangeText={setReason}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Departure</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="mm/dd/yyyy"
                                    placeholderTextColor="#A0ABC0"
                                    value={fromDate}
                                    onChangeText={setFromDate}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Return</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="mm/dd/yyyy"
                                    placeholderTextColor="#A0ABC0"
                                    value={toDate}
                                    onChangeText={setToDate}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitBtn} onPress={handleApply}>
                            <Text style={styles.submitBtnText}>Submit Request</Text>
                        </TouchableOpacity>
                        <Text style={styles.disclaimer}>DIGITAL SIGNATURE WILL BE APPLIED AUTOMATICALLY</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <View>
                            <Text style={styles.infoTitle}>Standard Processing</Text>
                            <Text style={styles.infoSubtitle}>Typically approved within 2 hours</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FE' },
    container: { padding: 24, paddingTop: 0, paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0, paddingTop: 12 },
    backButton: { width: 40, height: 40, justifyContent: 'center' },
    backIconText: { fontSize: 28, color: '#4B6396', fontWeight: '300' },
    avatarPlaceholder: { width: 32, height: 32, backgroundColor: '#E2E8F0', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    headerBrand: { fontSize: 20, fontWeight: '700', color: '#4B6396' },
    eyebrow: { fontSize: 11, fontWeight: '700', color: '#718096', letterSpacing: 1.5, marginBottom: 8 },
    title: { fontSize: 32, fontWeight: '700', color: '#2D3748', marginBottom: 12 },
    subtitle: { fontSize: 15, color: '#718096', lineHeight: 22, marginBottom: 32 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, shadowColor: '#435585', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 8 }, shadowRadius: 24, elevation: 5, marginBottom: 24 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 13, fontWeight: '700', color: '#4A5568', marginBottom: 8, textTransform: 'uppercase' },
    inputContainer: { backgroundColor: '#F1F3F9', borderRadius: 12, paddingHorizontal: 16, height: 52, justifyContent: 'center' },
    input: { fontSize: 15, color: '#2D3748' },
    submitBtn: { backgroundColor: '#4B6396', borderRadius: 12, height: 52, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
    submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    disclaimer: { fontSize: 10, color: '#A0ABC0', textAlign: 'center', marginTop: 16, letterSpacing: 0.5 },
    infoCard: { flexDirection: 'row', backgroundColor: '#F5E6FF', borderRadius: 16, padding: 16, alignItems: 'center' },
    infoIconBox: { width: 40, height: 40, backgroundColor: '#E9D5FF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    infoTitle: { fontSize: 14, fontWeight: '600', color: '#2D3748' },
    infoSubtitle: { fontSize: 12, color: '#718096' }
});

export default ApplyScreen;