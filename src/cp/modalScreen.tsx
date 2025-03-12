
import { PropsWithChildren } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet, Pressable } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";


type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
    title?: string;
}>;
export default function ModalScreen({ isVisible, children, onClose, title = "Login" }: Props) {

    const [email, setEmail] = useState("");
    const [uuid, setUuid] = useState("");
    const [uuidGenerated, setUuidGenerated] = useState(false);

    const gerarUUID = () => {
        if (email.trim() !== "") {
            setUuid(uuidv4());
            setUuidGenerated(true);
        }
    };
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                {children}

                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Button title="Gerar UUID" onPress={gerarUUID} />
                {uuidGenerated && (
                    <View style={styles.resultadoUUID}>
                        <Text>Email: {email}</Text>
                        <Text>UUID: {uuid}</Text>
                    </View>
                )}

            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    modalContent: {
        height: "25%",
        width: "100%",
        backgroundColor: "#25292e",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
        height: "16%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        color: "#fff",
        fontSize: 16,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        marginVertical: 10,
        backgroundColor: "white",
    },
    resultadoUUID: {
        marginTop: 20,
        alignItems: "center",
    },
});
