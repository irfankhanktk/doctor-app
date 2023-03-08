import firebase from '@react-native-firebase/firestore';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { COLLECTIONS } from '../config/constants';
import { getCurrentUserId } from '../services/firebase';
import { Task } from '../types/entities-types';
import { UTILS } from '../utils';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = getCurrentUserId();
    console.log('userId::::>', userId);

    useEffect(() => {
        try {
            setLoading(true);
            const subscriber = firebase()
                .collection(COLLECTIONS.tasks)
                .where('userId', '==', userId)
                .onSnapshot(querySnapshot => {
                    console.log('Total users: ', querySnapshot.size);
                    const arr: Task[] = [];
                    querySnapshot.forEach(documentSnapshot => {
                        arr?.push({ ...documentSnapshot.data(), id: documentSnapshot?.id })
                    });
                    setTasks(arr);
                    setLoading(false);
                });

            // Stop listening for updates when no longer required
            return () => subscriber();
        } catch (error) {
            Alert.alert('', UTILS?.returnError(error))
        } finally {
            setLoading(false);
        }
    }, []);

    return { tasks, loading };
}