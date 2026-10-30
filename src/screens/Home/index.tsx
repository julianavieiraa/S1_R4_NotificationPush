
import { useState } from 'react';
import {View, Text,TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as Notifications from 'expo-notifications';

export default function HomeScreen() {
  const [carregando, setCarregando] = useState(false);

  async function enviarNotificacao() {
    try {
      setCarregando(true);

      const { status: statusAtual } =
        await Notifications.getPermissionsAsync();

      let statusFinal = statusAtual;

      if (statusAtual !== 'granted') {
        const { status } =
          await Notifications.requestPermissionsAsync();

        statusFinal = status;
      }

      if (statusFinal !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Ative as notificações nas configurações do celular.'
        );
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Nova notificação!',
          body: 'Você recebeu uma nova notificação no aplicativo.',
          sound: true,
        },
        trigger: null,
      });

    } catch (error) {
      console.error('Erro ao enviar notificação:', error);

      Alert.alert(
        'Erro',
        'Não foi possível enviar a notificação.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Notificações
      </Text>

      <Text style={styles.description}>
        Clique no botão para receber uma notificação.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={enviarNotificacao}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando ? 'Enviando...' : 'Enviar notificação'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDDA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#401216',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#6D2932',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6D2932',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
