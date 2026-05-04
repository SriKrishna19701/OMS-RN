import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import API from "../../services/api";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        try {
            await API.post("/api/auth/register", { name, email, password, role: 'student' });
            alert("Registration successful! Please log in.");
            navigation.navigate("Login");
        } 
        catch (err) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.keyboardView}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.logoContainer}>
                <View style={styles.iconWrapper}>
                  <Text style={styles.lockIcon}>📝</Text>
                </View>
                <Text style={styles.brandTitle}>PassFlow</Text>
                <Text style={styles.subtitle}>Request institutional access</Text>
              </View>

              <View style={styles.card}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="John Doe"
                      placeholderTextColor="#A0ABC0"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Work Email</Text>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputIcon}>@</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="name@institution.com"
                      placeholderTextColor="#A0ABC0"
                      value={email}
                      onChangeText={setEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Text style={[styles.inputIcon, { fontSize: 14, transform: [{ rotate: '45deg' }] }]}>🗝</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#A0ABC0"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                  <Text style={styles.loginButtonText}>Register Access</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <View style={styles.registerPrompt}>
                  <Text style={styles.registerText}>Already have access? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.registerLink}>Sign In to Dashboard</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.footer}>
                <View style={styles.badge}><Text style={styles.badgeText}>SECURITY+</Text></View>
                <View style={styles.badge}><Text style={styles.badgeText}>ISO-27001</Text></View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#435585',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  lockIcon: {
    fontSize: 24,
    color: '#4B6396',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4B6396',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#435585',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
    marginBottom: 40,
  },
  errorText: {
    color: '#E53E3E',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F3F9',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
  },
  inputIcon: {
    fontSize: 18,
    color: '#718096',
    marginRight: 12,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D3748',
  },
  loginButton: {
    backgroundColor: '#4B6396',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 24,
  },
  registerPrompt: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#718096',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B6396',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  badge: {
    backgroundColor: '#F1F3F9',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A0ABC0',
    letterSpacing: 0.5,
  },
});

export default RegisterScreen;