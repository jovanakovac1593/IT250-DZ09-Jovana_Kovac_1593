/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.pages;

import com.mycompany.methotels.entities.Admin;
import com.mycompany.methotels.interfaces.AdminDAO;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Jovana Kovac
 */
public class AdminDaoImpl implements AdminDAO {

    @Inject
    private Session session;

    @Override
    public Admin checkAdmin(String username, String password) {
        try {
            Admin u = (Admin) session.createCriteria(Admin.class).add(Restrictions.eq("username",
                    username)).add(Restrictions.eq("password", password)).uniqueResult();
            if (u != null) {
                return u;
            }
            return null;
        } catch (NullPointerException e) {
            return null;
        }
    }

    @Override
    public Admin registerAdmin(Admin user) {
        return (Admin) session.merge(user);
    }

    @Override
    public boolean checkIfUsernameExists(String username) {
        Long rows = (Long) session.createCriteria(Admin.class).add(Restrictions.eq("username",
                username)).setProjection(Projections.rowCount()).uniqueResult();
        return (rows == 0) ? false : true;

    }
}
