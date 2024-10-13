import kafka from "./services.kafka.config";

export const createTopic = async (topicName: string) => {
  try {
    let admin = kafka.admin();
    await admin.connect();
    let created = await admin.createTopics({
      topics: [{ topic: topicName }],
      waitForLeaders: true,
    });
    await admin.disconnect();
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteTopic = async (topicName: string) => {
  try {
    let admin = kafka.admin();
    await admin.connect();
    await admin.deleteTopics({
      topics: [topicName],
    });
    await admin.disconnect();
    return true;
  } catch (error) {
    return false;
  }
};

export const sendData = async (key: string, topicName: string, data: any) => {
  try {
    let admin = kafka.admin();
    let producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: topicName,
      messages: [
        {
          key,
          value: JSON.stringify(data),
        },
      ],
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const getConsumer = async (topicName: string, group = topicName) => {
  try {
    console.log("54 -----------", topicName);
    const consumer = kafka.consumer({
      groupId: group,
    });
    await consumer.connect();

    await consumer.subscribe({
      topic: topicName,
      fromBeginning: true,
    });

    return { success: true, data: consumer, err: null };
  } catch (error) {
    return { success: false, data: null, err: error };
  }
};

export const sendRecord = async (key: string, topic: string, data: any) => {
  try {
    await sendData(key, topic, data);
    return true;
  } catch (err) {
    console.log("4 --------------", err);
    return err;
  }
};
