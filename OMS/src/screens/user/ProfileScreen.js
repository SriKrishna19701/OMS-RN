import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <View style={{width: 40}} />
            <Text style={styles.headerBrand}>OMS</Text>
            <View style={styles.avatarPlaceholder}><Text style={{fontSize: 14, color: '#4B6396', fontWeight: 'bold'}}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text></View>
        </View>

        <View style={styles.container}>
            <Text style={styles.pageTitle}>User Profile</Text>
            <Text style={styles.subtitle}>Manage your institutional identity</Text>

            <View style={styles.card}>
                <View style={styles.profileHeader}>
                    <View style={styles.largeAvatar}><Text style={{fontSize: 40, color: '#4B6396', fontWeight: 'bold'}}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text></View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.role}>{user?.role?.toUpperCase() || 'STUDENT'}</Text>
                </View>
                
                <View style={styles.divider} />

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.input}>{user.email}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutButtonText}>Log Out from Device</Text>
                </TouchableOpacity>
            </View>
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
  pageTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: 4,
  },
  subtitle: {
      fontSize: 14,
      color: '#718096',
      marginBottom: 32,
  },
  card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: 24,
      shadowColor: '#435585',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      elevation: 5,
  },
  profileHeader: {
      alignItems: 'center',
      marginBottom: 16,
  },
  largeAvatar: {
      width: 80,
      height: 80,
      backgroundColor: '#F1F3F9',
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
  },
  name: {
      fontSize: 22,
      fontWeight: '700',
      color: '#2D3748',
      marginBottom: 4,
  },
  role: {
      fontSize: 12,
      fontWeight: '600',
      color: '#4B6396',
      letterSpacing: 1,
      backgroundColor: '#F1F3F9',
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 12,
  },
  divider: {
      height: 1,
      backgroundColor: '#E2E8F0',
      marginVertical: 24,
  },
  infoRow: {
      marginBottom: 24,
  },
  label: {
      fontSize: 13,
      fontWeight: '600',
      color: '#718096',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
  },
  inputContainer: {
      backgroundColor: '#F8F9FE',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E2E8F0',
  },
  input: {
      fontSize: 16,
      color: '#4A5568',
      fontWeight: '500',
  },
  logoutButton: {
      backgroundColor: '#E53E3E',
      borderRadius: 12,
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
  },
  logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
  }
});

export default ProfileScreen;