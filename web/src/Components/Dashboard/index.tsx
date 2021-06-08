import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { Query, useMutation } from 'react-apollo';
import { GET_TASKS, UPDATE_TASK, ADD_TASK, DELETE_TASK } from '../../Queries';
import { styles } from './styles';
import InputAtom from 'Atoms/InputAtom';
import { updateTaskId, updateHeaderText } from 'Actions';
import HeaderAtom from 'Atoms/HeaderAtom';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const [mainValue, setMainValue] = useState("");
    const { taskId, headerText } = useSelector((state: { main: { taskId: number, headerText: any }})=>state.main);
    const [listArray, setListArray] = useState([]);
    const [updateTask] = useMutation(UPDATE_TASK);
    const [addTask, res] = useMutation(ADD_TASK);
    const [deleteTask] = useMutation(DELETE_TASK);
    const onCompleted = (a: any) => {
        setMainValue(a.getTasks.task);
        setListArray(a.getTasks.list);
        dispatch(updateHeaderText(a.getTasks.id, a.getTasks.task))
    }
    const createNode = async () => {
        const added = await addTask({ variables: { pId: 0, task: "" } })
        dispatch(updateTaskId(added.data.addTask))
    }
    return (
        <View style={styles.dashboardContainer}>
            <Query query={GET_TASKS} variables={{ id: taskId }} onCompleted={onCompleted}>
                {(result: any) => {
                    const { error, data, refetch } = result;
                    if (error) {
                        console.log(error)
                        return <h4>Error !!!</h4>
                    }
                    const update = () => {
                        updateTask({ variables: { id: taskId, task: mainValue } });
                    }
                    return (
                        <View style={styles.dashboardContainer}>
                            {data && data.getTasks && <>
                            <ScrollView contentContainerStyle={styles.dashListContainer}>
                                <View>
                                    <HeaderAtom 
                                    headerText={taskId === 0 ? [] : headerText} 
                                    onPress={(id)=>dispatch(updateTaskId(id))}
                                    />
                                    {taskId !== 0 && <InputAtom 
                                    autoFocus={true}
                                    placeholder={"Untitled"}
                                    onChangeText={setMainValue}
                                    onSubmitEditing={update}
                                    onBlur={update}
                                    value={mainValue}
                                    />}
                                    {
                                        listArray && listArray.length > 0 && listArray.map(({ id, task }: any, key: number)=>{
                                            return (
                                                <View key={key} style={styles.listContainer}>
                                                    <TouchableOpacity 
                                                    style={styles.dotContainer} 
                                                    activeOpacity={1}
                                                    onPress={()=>dispatch(updateTaskId(id))}
                                                    >
                                                        <View style={styles.dotView} />
                                                    </TouchableOpacity>
                                                    <InputAtom 
                                                    placeholder={"Add Task"}
                                                    onChangeText={(s: string)=>{
                                                        const array: any = [...listArray];
                                                        array[key].task = s;
                                                        setListArray(array);
                                                    }}
                                                    onSubmitEditing={()=>updateTask({ variables: { id, task } })}
                                                    onBlur={()=>updateTask({ variables: { id, task } })}
                                                    style={{ fontSize: 16 }}
                                                    value={task}
                                                    onKeyPress={async ()=>{
                                                        await deleteTask({ variables: { id } })
                                                        const { data } = await refetch({ id: taskId })
                                                        setListArray(data.getTasks.list);
                                                    }}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                                    <TouchableOpacity 
                                    style={[styles.addTaskButton, { opacity: res.loading ? .5 : 1 }]} 
                                    activeOpacity={.9}
                                    onPress={async ()=>{
                                        await addTask({ variables: { pId: taskId, task: "" } })
                                        const { data } = await refetch({ id: taskId })
                                        setListArray(data.getTasks.list);
                                    }}
                                    disabled={res.loading ? true : false}
                                    >
                                        <Text style={styles.addTaskButtonText}>+ ADD TASK</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                            <TouchableOpacity 
                            style={styles.buttonCreate} 
                            activeOpacity={.9}
                            onPress={createNode}
                            >
                                <Text style={styles.buttonCreateText}>CREATE NEW NODE</Text>
                            </TouchableOpacity>
                            </>}
                        </View>
                    )
                }}
            </Query>
        </View>
    )
}

export default Dashboard;

/*
import React, { useRef } from 'react';
import { View, ScrollView, Text, Animated, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Query } from 'react-apollo';
import { PRODUCT_QUERY } from '../Queries';
import HeaderAtom from '../Atoms/HeaderAtom';
import SelectAtom from '../Atoms/SelectAtom';
import { colors } from '../Styles/Colors';
import { toggleMenu, saveProducts, updateCart } from "../Actions";
import ListAtom from '../Atoms/ListAtom';
import SideMenu from './SideMenu';
import { styles } from '../Styles';

const Dashboard: React.FC = () => {
    const animateMenu = useRef(new Animated.Value(0));
    const dispatch = useDispatch();
    const { open, currency } = useSelector((state: any)=>state.main);
    const { width } = useWindowDimensions();
    const device = width < 768;
    const toggleCart = (item: any) => {
        if (!open){
            dispatch(updateCart(item, true));
        }
        animate();
    }
    const animate = () => {
        if (!open){
            dispatch(toggleMenu());
            Animated.timing(animateMenu.current, {
                toValue: 1,
                duration: 400,
                useNativeDriver: false
            })
            .start();
        } else {
            Animated.timing(animateMenu.current, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            })
            .start(()=>dispatch(toggleMenu()));
        }
    }
    const MENU_WIDTH = device ? width : width/2;
    const sideMenuBg = animateMenu.current.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(205, 209, 206, 0)', 'rgba(205, 209, 206, 0.8)']
    })
    const position = animateMenu.current.interpolate({
        inputRange: [0, 1],
        outputRange: [-(MENU_WIDTH), 0]
    })
    return (
        <View style={styles.dashboardContainer}>
            {
                open && 
                <Animated.View 
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: sideMenuBg,
                    zIndex: 999
                }}
                >
                    <Animated.View
                    style={{
                        width: MENU_WIDTH,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: position,
                        zIndex: 999
                    }}
                    >
                        <SideMenu onClose={animate} />
                    </Animated.View>
                </Animated.View>
            }
            <Query query={PRODUCT_QUERY} variables={{ currency }} onCompleted={(data: any)=> dispatch(saveProducts(data.products))}>
                {(result: any) => {
                    const { loading, error, data } = result;
                    if (loading) return <h4>Loading ...</h4>
                    if (error) {
                        console.log(error)
                        return <h4>Error !!!</h4>
                    }
                    return (
                        <View style={styles.dashboardContainer}>
                            <HeaderAtom 
                            onCartPress={animate}
                            />
                            <ScrollView 
                            contentContainerStyle={{ flex: 1, backgroundColor: colors.bgColor }}
                            style={styles.dashboardScrollView}
                            >
                                <View style={[styles.dashboardSection, { paddingHorizontal: device ? 20 : 40 }]}>
                                    <View>
                                        <Text style={[styles.productHeaderText, { fontSize: device ? 32 : 42 }]}>All Products</Text>
                                        <Text style={[styles.productHeaderSubText, { fontSize: device ? 14 : 16 }]}>A 360° look at Lumin</Text>
                                    </View>
                                    <SelectAtom />
                                </View>
                                <View>
                                    <View style={[styles.dashboardWrap, { paddingHorizontal: device ? 10 : 20 }]}>
                                        {
                                            data.products && data.products.length > 0 && data.products.map((item: any, key: number)=>{
                                                return (
                                                    <ListAtom 
                                                    key={key}
                                                    item={item}
                                                    onPress={()=>toggleCart(item)}
                                                    />
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    )
                }}
            </Query>
        </View>
    )
}

export default Dashboard;

*/