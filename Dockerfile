FROM node:18

RUN apt-get update && apt-get install fish vim curl sudo tmux -y && \
    echo "fish" >>~/.bashrc

RUN echo 'root:123' | chpasswd
RUN echo 'node:123' | chpasswd

RUN npm i -g npm
RUN npm i -g npm-check-updates

RUN sudo usermod -a -G sudo node

USER node

# customize tmux
RUN cd && \
    git clone https://github.com/gpakosz/.tmux.git && \
    ln -s -f .tmux/.tmux.conf && \
    cp .tmux/.tmux.conf.local .

RUN echo "fish" >>~/.bashrc
RUN mkdir -p ~/.config/fish
RUN echo "alias tmux='tmux -2'" >>~/.config/fish/config.fish
RUN echo "set -g default-terminal 'xterm-256color' \n set-option -ga terminal-overrides ',xterm-256color:Tc'" >>~/.tmux.conf

WORKDIR /app

ENV PORT=5055

EXPOSE 5055

