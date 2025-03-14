import * as React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json'
import { ApplicationProvider, ModalService } from '@ui-kitten/components';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import SignUp from './SignUp';
import StudentRegister from './StudentRegister';
import FirstScreen from './FirstScreen'
import TeacherRegister from './TeacherRegister'
import ProfileScreen from './ProfileScreen';
import NavigateScreen from './NavigateScreen';
import TeacherHome from './TeacherView/TeacherHome';
import TeacherCourse from './TeacherView/TeacherCourse';
import TeacherLesson from './TeacherView/TeacherLesson';
import TeacherQuestion from './TeacherView/TeacherQuestion';
import TeacherCreateCourse from './TeacherView/TeacherCreateCourse';
import TeacherCreateLesson from './TeacherView/TeacherCreateLesson';
import TeacherCreateQuestion from './TeacherView/TeacherCreateQuestion';
import StudentCourse from './StudentCourse';
import StudentLesson from './StudentLesson';
import StudentQuestion from './StudentQuestion';
import { AuthProvider } from './AuthContext';
ModalService.setShouldUseTopInsets = true

const RegisterTabs = createNativeStackNavigator({
  screens: {
    Student: {
      screen: StudentRegister,
      options: {
        title: 'Student Register',
        headerShown: false
      }
    },
    Teacher: {
      screen: TeacherRegister,
      options: {
        title: 'Teacher Register',
        headerShown: false
      }
    },
  },
  screenOptions: {
    headerStyle: {
      backgroundColor: '#526F8C',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})

const HomeTabs = createBottomTabNavigator({
  screens: {
    Navigate: {
      screen: NavigateScreen,
      options: {
        title: 'Navigate'
      }
    },
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Home'
      }
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        title: 'Profile',
        headerShown: false
      }
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        title: 'Settings'
      }
    },
    TeacherHome: {
      screen: TeacherHome,
      options: {
        title: 'Teacher View Home'
      }
    },
    
  },
  screenOptions: {
    title: 'EliteCode'
  }
})

const LoginTabs = createNativeStackNavigator({
  screens: {
    LoginScreen: {
      screen: LoginScreen,
      options: {
        headerShown: false
      }
    },
    SignUp: {
      screen: SignUp,
      options: {
        headerShown: false
      }
    },
    RegisterGroup: {
      screen: RegisterTabs,
      options: {
        title: 'Register',
        headerShown: false
      }
    }
  },
})

const TeacherTabs = createNativeStackNavigator({
  screens: {
    Home: {
      screen: TeacherHome,
      options: {
        title: 'Teacher Home'
      }
    },
    Course: {
      screen: TeacherCourse,
      options: {
        title: 'Course Name'
      }
    },
    Lesson: {
      screen: TeacherLesson,
      options: {
        title: 'Lesson Name',
        headerBackVisible: false
      }
    },
    Question: {
      screen: TeacherQuestion,
      options: {
        title: 'Question #',
        headerBackVisible: false
      }
    },
    CreateCourse: {
      screen: TeacherCreateCourse,
      options: {
        title: 'Create Course'
      }
    },
    CreateLesson: {
      screen: TeacherCreateLesson,
      options: {
        title: 'Create Lesson'
      }
    },
    CreateQuestion: {
      screen: TeacherCreateQuestion,
      options: {
        title: 'Create Question',
        headerBackVisible: false
      }
    }

  },
})

const StudentTabs = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Student Home'
      }
    },
    Course: {
      screen: StudentCourse,
      options: {
        title: 'Student Course'
      }
    },
    Lesson: {
      screen: StudentLesson,
      options: {
        title: 'Student Lesson'
      }
    },
    Question: {
      screen: StudentQuestion,
      options: {
        title: 'Student Question'
      }
    }
  }
})

const RootStack = createNativeStackNavigator({
  screens: {
    First: {
      screen: FirstScreen,
      options: { headerShown: false },
    },
    LoginGroup: {
      screen: LoginTabs,
      options: {
        headerShown: false
      }
    },
    HomeGroup: {
      screen: HomeTabs,
      options: {
        headerShown: false
      }
    },
    TeacherGroup: {
      screen: TeacherTabs,
      options: {
        headerShown: false
      }
    },
    StudentGroup: {
      screen: StudentTabs,
      options: {
          headerShown: false
      }
    }
  }
})

const Navigation = createStaticNavigation(RootStack)

export default function App() {

  return (
    <>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <AuthProvider>
        <Navigation />
        </AuthProvider>
      </ApplicationProvider>
    </>
  )
}