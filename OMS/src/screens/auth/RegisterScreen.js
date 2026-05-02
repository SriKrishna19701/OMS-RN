imort React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import API from "../../services/api";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

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
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    error: {
        color: "red",
        marginBottom: 15,
        textAlign: "center",
    },
});

export default RegisterScreen;