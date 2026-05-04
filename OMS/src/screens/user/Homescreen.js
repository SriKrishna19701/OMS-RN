import React, {useState, useEffect }from react;
import { View, Text, Button } from 'react-native';
import API from '../../services/api';

const HomeScreen = () => {
    const [requests, setRequests] = useState([]);

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
  // Monthly Usage Stats
   const currentMonth = new Date().getMonth() + 1; // getMonth is 0-indexed 
    const currentYear = new Date().getFullYear();
    const monthlyCount = requests.filter(req => {
        const reqDate = new Date(req.createdAt);
        return reqDate.getMonth() + 1 === currentMonth && reqDate.getFullYear() === currentYear;
    })
    const usage = monthlyCount.length >= 3 ? 'Limit Reached' : `${monthlyCount.length} out of 3 used`;
    // active status
    const activeRequest = requests.find(req => req.status === 'approved' && new Date(req.toDate) >= new Date());
    const isActive = !!activeRequest;
    return (
        <View>
            <Text>My Outpass Requests</Text>
            <Text>Monthly Count: {monthlyCount.length}</Text>
            <Text>Usage: {usage}</Text>
            <Text>Active: {isActive ? 'Yes' : 'No'}</Text>
            {requests.map((req) => (
                <View key={req._id}>
                    <Text>{req.reason} - {req.status}</Text>
                </View>
            ))}
        </View>
    );
};

export default HomeScreen;  