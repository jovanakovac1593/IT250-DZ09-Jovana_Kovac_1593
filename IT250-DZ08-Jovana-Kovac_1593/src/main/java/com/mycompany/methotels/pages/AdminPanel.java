/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.pages;

import com.mycompany.methotels.entities.Admin;
import com.mycompany.methotels.entities.Hoteli;
import com.mycompany.methotels.entities.Rezervacija;
import com.mycompany.methotels.entities.Sobe;
import com.mycompany.methotels.interfaces.AdminDAO;
import com.mycompany.methotels.interfaces.HotelsDAO;
import com.mycompany.methotels.interfaces.RezervacijeDAO;
import com.mycompany.methotels.rola.Role;
import com.mycompany.methotels.services.ProtectedPage;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import org.apache.tapestry5.annotations.Component;
import org.apache.tapestry5.annotations.Persist;
import org.apache.tapestry5.annotations.Property;
import org.apache.tapestry5.annotations.SessionState;
import org.apache.tapestry5.corelib.components.BeanEditForm;
import org.apache.tapestry5.hibernate.annotations.CommitAfter;
import org.apache.tapestry5.ioc.annotations.Inject;

/**
 *
 * @author Jovana Kovac
 */
@ProtectedPage
@RolesAllowed(value = {"Admin"})
public class AdminPanel {

    //Login
    @SessionState
    private Admin loggedInUser;

    public boolean getLoggedIn() {
        if (loggedInUser.getUsername() != null) {
            return true;
        }
        return false;
    }

    public Class<AdminLogin> onActionFromLogout() {
        loggedInUser = null;
        return AdminLogin.class;
    }

    //Dodavanje sobe
    @Property
    private Sobe sobe;
    @Inject
    private HotelsDAO hotelsDao;
    @Component
    private BeanEditForm fsobe;

    @CommitAfter
    Object onActionFromFsobe() {
        hotelsDao.dodajSobu(sobe);
        return this;
    }
    //Rezervacija sobe
    @Property
    private Rezervacija rezervacija;
    @Component
    private BeanEditForm rezervisi;
    @Inject
    private RezervacijeDAO rd;

    @CommitAfter
    Object onActionFromRezervisi() {
        rd.dodajRezervaciju(rezervacija);
        return this;
    }

    //Admin registracija
    @Inject
    private AdminDAO adminDAO;
    @Component
    private BeanEditForm adminRegister;
    @Property
    private Admin administrator;

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
    Object onActionFromAdminRegister() {
        if (!adminDAO.checkIfUsernameExists(administrator.getUsername())) {
            String unhashPassword = administrator.getPassword();
            administrator.setPassword(getMD5Hash(unhashPassword));
            administrator.setRola(Role.Admin);
            Admin u = adminDAO.registerAdmin(administrator);
            loggedInUser = u;
            return AdminPanel.class;
        } else {
            adminRegister.recordError("Username koji ste uneli ve? postoji");
            return null;
        }
    }
}
