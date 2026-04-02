---
sidebar_position: 2
id: Cluster Deployment Preconditions
---

<div class="center">
    <p class="samplePreface">This page describes the system environment preconditions for deploying a containerized SaaS solution on-premises. This content makes reference to other, excluded sections of the larger document from which this sample was excerpted.</p>
</div>
<hr />

# 1.4 Cluster Deployment Preconditions
In order to install PRODUCT on-premises, your environment must meet the following preconditions:
- [1.4.1 SSL Certificate](#141-ssl-certificate)
- [1.4.2 Kubernetes Cluster](#142-kubernetes-cluster)
- [1.4.3 Installer Machine](#143-installer-machine)
- [1.4.4 SMTP Server](#144-smtp-server)
- [1.4.5 Coordinate with COMPANY Customer Service Representative](#145-coordinate-with-company-customer-service-representative)

## 1.4.1 SSL Certificate

You must obtain a Secure Sockets Layer (SSL) certificate in PEM format from a Certificate Authority trusted by all machines and client devices in your PRODUCT environment, including the machines in your PRODUCT Cluster. This certificate should be placed in a file with the following name:

<p class="code">product.pem</p>

:::important
A self-signed certificate is NOT sufficient and will result in system errors. Your SSL certificate must be provided by a trusted Certificate Authority.
:::

When properly configured, your **product.pem** file should be formatted similar to the following:

<div class="smallCodeBlock">
```
-----BEGIN CERTIFICATE-----
(certificate for your domain)
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
(intermediate certificate)
-----END CERTIFICATE-----

-----BEGIN CERTIFICATE-----
(optional intermediate certificates in ascending order to root certificate authority)
-----END CERTIFICATE-----

-----BEGIN PRIVATE KEY-----
(private key for domain)
-----END PRIVATE KEY-----
```
</div>

<hr />

## 1.4.2 Kubernetes Cluster

You must prepare a set of computers or virtual machines that will host and run the PRODUCT components and services, collectively referred to as your *PRODUCT Cluster*. Your PRODUCT Cluster must meet the following requirements and preconditions:

 - [1.4.2.1 Nodes](#1421-nodes)
 - [1.4.2.2 Ubuntu Linux OS](#1422-ubuntu-linux-os)
 - [1.4.2.3 PRODUCT maintenance account](#1423-product-maintenance-account)
 - [1.4.2.3 Firewall Rules](#1423-firewall-rules)
 - [1.4.2.4 Internet Connection](#1424-internet-connection)
 - [1.4.2.5 Docker Proxy Details](#1425-docker-proxy-details)
 - [1.4.2.6 Malware Prevention Tool](#1426-malware-prevention-tool)

### 1.4.2.1 Nodes

A PRODUCT Cluster deployed on-premises requires the following types of machines (or "nodes"), each of which can exist as a physical computer or virtual machine. The node requirements listed below indicate the minimum conditions for ensuring **high availability** operations in a PRODUCT environment. Your own requirements may vary depending on your needs.

- **K8s Master Node:** At a minimum, the Kubernetes master node will host your **kubernetes_master** component, and may also host your *logging* and *monitoring* components. The master node may also give you access to **ignite** and **rabbitmq** as k8s applications, if you do not require them to act as independent components.

    Your PRODUCT master node must meet the following minimum requirements:

    - Min Quantity: 1
    - CPU: 4 Cores
    - RAM: 16 GB

- **K8s Worker Nodes:** Your worker nodes each host a single **kubernetes_node** component which run K8s applications. Your worker nodes should typically not host any other Epiphany components.

    Each PRODUCT worker node must meet the following minimum requirements:

    - Min Quantity: 3
    - CPU: 4 Cores
    - RAM: 32 GB

- **Support Nodes:** Your support nodes will run all other Epiphany components, including **kafka**, **load_balancer**, **opendistro_for_elasticsearch**, and **postgresql**, and also **ignite** and **rabbitmq** if you are running them as independent components. You may distribute these components in any quantity and combination you prefer, although a given node should only host one instance of each component.

    Each PRODUCT support node must meet the following minimum requirements:

    - Min Quantity: 3
    - CPU: 4 Cores
    - RAM: 16 GB

### 1.4.2.2 Ubuntu Linux OS

Every node in your PRODUCT Cluster must be running the Ubuntu Linux OS.

### 1.4.2.3 PRODUCT maintenance account

Every node in your PRODUCT Cluster must have a user account meeting all of the following criteria, which will be referred to in this document as the **PRODUCT maintenance** account. This account will be used to perform all PRODUCT installation and maintenance tasks:

- **Username is 'maintenance'**

    The PRODUCT maintenance account must have exactly the following username:

    <p class="code">maintenance</p>

- **Accessible via SSH**

    Your nodes will normally be accessed as the PRODUCT maintenance account via SSH to perform all installation and maintenance tasks.

- **Uses SSH Public Key Authentication**

    The PRODUCT maintenance account should be configured to authenticate using a private key and never ask for passwords. You will need to provide public and private key files for this account in order to install PRODUCT. Your private key must use exactly the following filename:

    <p class="code">id_rsa</p>

    For a primer on SSH public key authentication, please refer to the following Web site:

    <p class="indent1">[https://serverpilot.io/docs/how-to-use-ssh-public-key-authentication](https://serverpilot.io/docs/how-to-use-ssh-public-key-authentication)</p>

- **Passwordless sudo access**

    The PRODUCT maintenance account must be able to run the `sudo` command without requiring a password.

- **UID and GID requirements**

    The PRODUCT maintenance account must have a UID of '9999' and belong to a group named 'maintenance' with a GID of '9999'. To confirm that your account is properly configured, execute the following command:

    <p class="indent1">`$ id maintenance`</p>

    If properly configured, you should receive the following output:

    <div class="indent1">
    ```
    uid=9999(maintenance) gid=9999(maintenance)`
    ```
    </div>

### 1.4.2.3 Firewall Rules

On **each** of your PRODUCT cluster's Master, Worker, and Support nodes, perform the following steps to apply all necessary firewall rules. It is recommended that you close all ports not explicitly opened below:

1. On **each** node, execute the following commands verbatim:

    <div class="indent1">
    ```
    sudo ufw allow 99/tcp
    sudo ufw allow 99/tcp
    sudo ufw allow 999/tcp
    sudo ufw allow 9999/tcp
    sudo ufw allow 9999/tcp
    sudo ufw allow 9999/tcp
    sudo ufw allow 9999/tcp
    sudo ufw allow 99999/tcp
    sudo ufw allow 99999/tcp
    sudo ufw allow from 192.168.0.0/16
    sudo ufw allow from 192.168.0.0/16
    sudo ufw enable
    ```
    </div>

2. On **each** node, execute the following command once for each node in your cluster (including the *present* node in each case) and the Installer Machine (see [1.4.3 Installer Machine](#143-installer-machine)), where **\<Node\>** is the IP address of the applicable node or Installer Machine.

    <p class="indent1">`sudo ufw allow from <Node>`</p>

    This is to ensure that each node in the cluster can communicate with every other node and the Installer Machine. For example, if you have 3 nodes in total in your PRODUCT cluster, then on each of these nodes, you would execute this command *4* times (once per node, plus once for the Installer Machine). For example:

    <div class="indent1">
    ```
    sudo ufw allow from 11.22.33.441
    sudo ufw allow from 11.22.33.442
    sudo ufw allow from 11.22.33.443
    sudo ufw allow from 11.22.33.500
    ```
    </div>

3. On **each** node, execute the following additional command to check the status of your firewall rules:
    
    <p class="indent1">`sudo ufw status verbose`</p>

### 1.4.2.4 Internet Connection

Every node in your PRODUCT Cluster requires an internet connection in order for Docker to access to the Docker.IO repository.

### 1.4.2.5 Docker Proxy Details

If your **Master** and **Worker** nodes access the internet via proxy, perform the following steps on these two nodes to add your proxy details as environment variables for use by Docker. This step is not needed for your *Support* nodes:

1. Execute the following command to create the necessary folder for your proxy configuration:

    <p class="indent1">`mkdir /etc/systemd/system/docker.service.d`</p>

2. In the above path, create a file named **http-proxy.conf** containing the following details for defining your proxy environment variables:

    <div class="indent1">
    ```
    [Service]
    Environment="HTTP_PROXY=<HTTP_PROXY>"
    Environment="HTTPS_PROXY=<HTTPS_PROXY>"
    Environment="NO_PROXY=<NODE_LIST>"
    ```
    </div>

    Where:

    - **\<HTTP_PROXY\>** is the hostname or IP address of your network's HTTP proxy, if applicable. Exclude this line if no HTTP proxy is applicable.
    - **\<HTTPS_PROXY\>** is the hostname or IP address of your network's HTTPS proxy, if applicable. Exclude this line if no HTTPS proxy is applicable
    - **\<NODE_LIST\>** is a comma-separated list of both the hostnames **AND** IP addresses for each of your cluster's Master, Worker, and Support nodes.

### 1.4.2.6 Malware Prevention Tool

It is strongly recommended that you install at least one malware prevention tool on each node in your PRODUCT Cluster.

<hr />

## 1.4.3 Installer Machine

You must prepare a computer from which you will execute the installation scripts that will install the PRODUCT cluster components and applications on to your nodes. This computer must meet the following preconditions:

- **Docker Engine**

    The Installer Machine must have the Docker Engine installed, either the Enterprise Edition (Docker EE) or the free Community Edition (Docker CE). The PRODUCT Cluster components are installed using the Epiphany toolset's **epicli** utility, which is most easily run using the Docker Engine. Any computer capable of installing the Docker Engine may be used, although a Linux workstation is typically preferred.

    To download and install Docker CE, please go to the following Web site and click the option for your desired operating system:

    <p class="indent1">[https://hub.docker.com/search/?type=edition&offering=community](https://hub.docker.com/search/?type=edition&offering=community)</p>

- **Internet Connection**

    The Installer Machine requires an internet connection in order to obtain the latest epicli container and various files required for PRODUCT application installation.

- **Unzip Tool**

    The Installer Machine requires an unzip tool to extract several zip packages used during PRODUCT platform and application installation. **7zip** is the recommended tool due to its ability to handle long file paths.

- **productonprefiles.zip**

    The Installer Machine will need several deployment and configuration files that you can obtain from the following package:

    <p class="code"><u>lmonpremfiles.zip</u></p>

- **Python Environment**

    The Installer Machine requires the following Python components:

    - <p>Python 3.7.0 or later</p>

    :::note
    The Python commands provided in this guide assume that the following command returns a value of '3.7.0' or later:

    <p class="indent1">`python --version`</p>
    :::

    - pip3

    - pipenv (pip3 install pipenv)

    - urllib3

- **Firewall rule**

    On your Installer Machine, ensure that your firewall rules meet the following criteria:

    - The Installer Machine allows incoming **SSH** connections on port 99

    - The Installer Machine allows incoming connections from **each** of your PRODUCT cluster's Master, Worker, and Support nodes **AND** from itself.

- **Base URL in NO_PROXY**

    If your Installer Machine accesses the internet via proxy, you must set your **NO_PROXY** and **no_proxy** environment variables to include the domain for the **base URL** that will provide end-user access to your PRODUCT applications.

    For example, if your base URL is *https:<span></span>//my-prod-onprem.com* and this was the only value you wanted to include in these environment variables, you would execute the following commands on your Installer Machine:

    <div class="indent1">
    ```
    export NO_PROXY=my-lm-onprem.com
    export no_proxy=my-lm-onprem.com
    ```
    </div>

<hr />

## 1.4.4 SMTP Server

Several PRODUCT applications can use email alerts to notify users of certain conditions. If you wish to use email alerts with PRODUCT, you will need to make the following preparations:

- **Prepare SMTP server**

    You will need to prepare your own SMTP server ahead of time. During PRODUCT installation, you will need to provide the following information about your SMTP server:

    - The **hostname or IP address** and **port** number of an SMTP server

    - A **username** and **password** for a user that the SMTP server will use to send email alerts

- **SMTP Firewall rule**

    Your firewall rules must allow incoming connections to your SMTP server from **each** of your PRODUCT cluster's Master, Worker, and Support nodes.

<hr />

## 1.4.5 Coordinate with COMPANY Customer Service Representative

Prior to the date of installation, you should coordinate with your COMPANY customer service representative to establish the following:

- **Release Package:** Your PRODUCT on-premises installation will be from a particular monthly release of PRODUCT (e.g. April 2025), which is associated with a corresponding set of PRODUCT Release Package folders produced by COMPANY development. Your COMPANY customer service representative must know ahead of time which particular PRODUCT release you wish to install in order for them to obtain the appropriate PRODUCT Release Package folders.

- **Disabled Features:** The COMPANY customer service representative must know ahead of time which features will be disabled in your environment, if any. This is necessary in order to establish the necessary customizations to a configuration file (relconfig.yml) used in PRODUCT application deployment, described in <u>2.2 Install the PRODUCT Applications</u>.