/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.pages;

import com.mycompany.methotels.entities.Admin;
import com.mycompany.methotels.interfaces.AdminDAO;
import com.mycompany.methotels.rola.Role;
import org.apache.tapestry5.annotations.Component;
import org.apache.tapestry5.annotations.Property;
import org.apache.tapestry5.annotations.SessionState;
import org.apache.tapestry5.corelib.components.BeanEditForm;
import org.apache.tapestry5.hibernate.annotations.CommitAfter;
import org.apache.tapestry5.ioc.annotations.Inject;

/**
 *
 * @author Jovana Kovac
 */
public class AdminRegister {

    @Property
    private Admin userReg;
    @SessionState
    private Admin loggedInUser;
    @Inject
    private AdminDAO userDao;
    @Component
    private BeanEditForm form;

    public String getMD5Hash(String yourString) {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            byte[] array = md.digest(yourString.getBytes());
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < array.length; ++i) {
                sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1, 3));
            }
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }

    @CommitAfter
    Object onSuccess() {
        if (!userDao.checkIfUsernameExists(userReg.getUsername())) {
            String unhashPassword = userReg.getPassword();
            userReg.setPassword(getMD5Hash(unhashPassword));
            userReg.setRola(Role.Admin);
            Admin u = userDao.registerAdmin(userReg);
            loggedInUser = u;
            return AdminLogin.class;
        } else {
            form.recordError("Username koji ste uneli ve? postoji");
            return null;
        }
    }
}
