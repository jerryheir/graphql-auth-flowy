import { StyleSheet } from 'react-native';
import { colors } from 'Styles/Colors';

export const styles = StyleSheet.create({
    dashboardScrollView: { 
        flex: 1, 
        backgroundColor: colors.bgColor 
    },
    dashboardContainer: {
        flex: 1
    },
    buttonCreate: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 21,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        position: "absolute",
        right: 50,
        bottom: 50,
        shadowColor: colors.shadow,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 2
    },
    buttonCreateText: {
        color: colors.white,
        fontFamily: 'Bau',
        fontWeight: "bold",
        fontSize: 21
    },
    dashListContainer: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 21
    },
    dotContainer: {
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        marginRight: 16,
        marginTop: 5
    },
    dotView: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    listContainer: {
        flexDirection: "row",
        // alignItems: "center"
    },
    addTaskButton: {
        backgroundColor: colors.primary,
        paddingVertical: 3,
        paddingHorizontal: 16,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        shadowColor: colors.shadow,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 2,
        shadowOpacity: 1,
        elevation: 2
    },
    addTaskButtonText: {
        color: colors.white,
        fontFamily: 'Bau',
        fontWeight: "bold",
        fontSize: 14
    }
})