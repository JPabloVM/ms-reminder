import axios from 'axios';

async function sendMessage(to: number, message: string) {
  try {
    const response = await axios.post(`${process.env.WHATSAPP_URL}/message`, {
      to: to,
      content: message,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
export default sendMessage;
