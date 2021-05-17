package com.rootcodelabs.keycloakclient.view;

import com.rootcodelabs.keycloakclient.model.LoginInfo;
import com.rootcodelabs.keycloakclient.service.ClientService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.logging.Logger;

@Route("login")


@PageTitle("Login | Vaadin CRM")

public class Login extends FormLayout {

    private static final Logger LOGGER = Logger.getLogger(Login.class.getName());

    private TextField username = new TextField("Username");
    private TextField password = new TextField("Password");
    private Button loginButton = new Button("login");
    private Binder<LoginInfo> binder = new Binder<>(LoginInfo.class);

    @Autowired
    ClientService clientService;

    public Login(){
        HorizontalLayout buttons = new HorizontalLayout(loginButton);
        loginButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        add(new H1("Welcome"),username, password, buttons);
        binder.bindInstanceFields(this);
        loginButton.addClickListener(event -> login());
    }

    private void login() {
        LOGGER.info("--------binder--------"+binder.getBean());
        LoginInfo loginInfo = binder.getBean();

        try {
            //AuthInfo authInfo = clientService.getKeyCloakKey("dGVzdFVTZXJ5eQ==", "MjM0NTY3");
            //LOGGER.info("vaadin class"+authInfo.getAccessToken());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
