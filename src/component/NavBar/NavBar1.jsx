// استيراد مكتبة React والمكونات المطلوبة من مكتبة MUI
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// استيراد ملف CSS الخاص بالمكون
import './navbar.css'

// استيراد صورة الشعار
import logoimg from '../img/logo.png';

// استيراد مكتبة FontAwesome والأيقونات المطلوبة
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPhone } from '@fortawesome/free-solid-svg-icons';

// تعريف مكون AnchorTemporaryDrawer كمكون افتراضي
export default function AnchorTemporaryDrawer() {
  // استخدام useState لتعريف حالة الدرج (Drawer)
  const [state, setState] = React.useState({
    right: false,
  });

  // دالة لإجراء مكالمة هاتفية
  const makeCall = () => { window.location.href = 'tel:0123456789'; };

  // دالة للتبديل بين فتح وإغلاق الدرج بناءً على الحدث
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // دالة للتمرير السلس إلى العناصر المحددة عند النقر على العناصر في القائمة
  const handleListItemClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = -50; // هنا تضيف -50 بكسل
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // دالة لتوليد قائمة العناصر داخل الدرج
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className= 'listnav'
    >
      <List>
        {/* عرض صورة الشعار داخل الدرج */}
        <img src={logoimg} alt="logo" className='logoimg m--5' />

        {/* توليد عناصر القائمة بناءً على البيانات المعطاة */}
        {[
          { text: 'البداية', target: 'heroid' },
          { text: 'ماهي المواقع الإلكترونية ', target: 'whatid' },
          { text: 'أنواع المواقع الإلكترونية', target: 'heroid' },
          { text: 'مزايا المواقع الإلكترونية', target: 'whatid' },
          { text: 'مكونات المواقع الإلكترونية', target: 'heroid' },
          { text: 'لماذا المواقع الإلكترونية', target: 'whatid' },
          { text: 'أمثلة على المواقع الإلكترونية', target: 'heroid' },
          { text: 'أهم المقالات', target: 'whatid' },
          { text: 'أسئلة العملاء', target: 'heroid' },
          { text: 'إطلب الخدمة الأن', target: 'whatid' },
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding  className=''>
            <ListItemButton onClick={(event) => handleListItemClick(event, item.target)}>
              <ListItemText primary={item.text} className='linav'/>
            </ListItemButton>
          </ListItem>
        ))}
        
        {/* زر لإجراء مكالمة هاتفية */}
        <button type="button" className="btn callbtn w-100 mt-4" onClick={makeCall}>
          إتصل بنا
          <FontAwesomeIcon icon={faPhone} className='me-2'/>
        </button>
      </List>
    </Box>
  );

  // واجهة المستخدم لمكون AnchorTemporaryDrawer
  return (
    <div className='sticky-navbar' id='navid'>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* عرض صورة الشعار داخل النافبار */}
          <img src={logoimg} alt="تكويب لتصميم مواقع الويب" className='logoimg me-4'/>
          <div>
            {/* زر لإجراء مكالمة هاتفية */}
            <button type="button" className="btn callbtn" onClick={makeCall}>
              إتصل بنا 
              <FontAwesomeIcon icon={faPhone} className="me-2" />
            </button>

            {/* زر لفتح الدرج */}
            <Button onClick={toggleDrawer('right', true)}>
              <FontAwesomeIcon icon={faBars}  className='bar'/>
            </Button>
          </div>
        </div>

        {/* توليد الدرج بناءً على اتجاهه */}
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor === 'center' ? 'right' : anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
