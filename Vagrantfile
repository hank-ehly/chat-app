# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "puppetlabs/centos-6.6-64-puppet"
  config.vm.network "forwarded_port", guest: 80, host: 8000
 
  config.vm.provider :virtualbox do |vb|
    vb.gui = false
    vb.memory = 512
    vb.cpus = 1
  end

end
